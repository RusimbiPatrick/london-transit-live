import React, { useMemo } from 'react';
import { Clock3 } from 'lucide-react';
import { usePredictionDetailed } from '../api/useTrackernet';
import { COMMON_STATIONS, TUBE_LINES } from '../data/network';
import SectionHeader from './ui/SectionHeader';
import Panel from './ui/Panel';
import LinePill from './ui/LinePill';
import LoadingState from './ui/LoadingState';
import StatePanel from './ui/StatePanel';
import SelectField from './ui/SelectField';

export default function ArrivalsBoard() {
  const [lineCode, setLineCode] = React.useState('V');
  const [stationCode, setStationCode] = React.useState('OXC');

  const { data: predictionGroups, error, loading, lastUpdated } = usePredictionDetailed(lineCode, stationCode);

  const selectedLineName = useMemo(() => TUBE_LINES.find((l) => l.code === lineCode)?.name || 'Line', [lineCode]);

  return (
    <div>
      <SectionHeader
        icon={Clock3}
        title="Live arrivals"
        description="Select a line and station to see live platform countdowns and current train locations."
        lastUpdated={lastUpdated}
        loading={loading}
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <SelectField label="Line" value={lineCode} onChange={(e) => setLineCode(e.target.value)} options={TUBE_LINES} />
        <SelectField label="Station" value={stationCode} onChange={(e) => setStationCode(e.target.value)} options={COMMON_STATIONS} />
      </div>

      {loading && !predictionGroups ? (
        <LoadingState label={`Fetching ${selectedLineName} arrivals…`} />
      ) : error ? (
        <StatePanel tone="danger" title="Unable to load arrivals" message={error.message} />
      ) : predictionGroups && predictionGroups.length > 0 ? (
        <div className="grid gap-6">
          {predictionGroups.map((station) => (
            <div key={station.code} className="space-y-4">
              <div className="flex items-center gap-4">
                <LinePill lineName={selectedLineName} />
                <span className="text-sm text-text-secondary">{station.name}</span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {station.platforms.map((platform) => (
                  <Panel key={platform.name} className="flex flex-col">
                    <div className="border-b border-border-soft px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-text-subtle">
                        <Clock3 className="h-3.5 w-3.5" />
                        <span>Platform</span>
                      </div>
                      <h3 className="mt-1 text-lg font-semibold text-text-primary">{platform.name}</h3>
                    </div>
                    <div className="divide-y divide-border-soft">
                      {platform.trains.map((train) => {
                        const countdown = getCountdownPresentation(train.secondsTo, train.timeTo);
                        return (
                          <div key={train.id} className="flex items-center justify-between px-5 py-4 transition duration-150 hover:bg-surface-hover">
                            <div className="min-w-0 flex-1">
                              <div className="text-base font-semibold text-text-primary">{train.destination || 'Unknown destination'}</div>
                              <div className="mt-1 flex items-center gap-2 text-sm text-text-secondary">
                                <span className="truncate">{train.location || 'Location unknown'}</span>
                              </div>
                            </div>
                            <div className={`ml-4 text-xl font-bold tabular-nums tracking-tight ${countdown.colorClass}`}>
                              {countdown.timeDisplay}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Panel>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <StatePanel title="No arrivals listed" message="The TfL board is not showing any imminent arrivals for this selection." />
      )}
    </div>
  );
}

function getCountdownPresentation(seconds, rawTimeTo) {
  if (seconds === 9999) return { colorClass: 'text-text-subtle', timeDisplay: rawTimeTo || 'Unknown' };
  if (seconds <= 0) return { colorClass: 'text-tfl-red', timeDisplay: 'Due' };

  let colorClass = 'text-text-primary';
  if (seconds < 60) colorClass = 'text-tfl-red';
  else if (seconds < 180) colorClass = 'text-warning';

  const mins = Math.floor(seconds / 60);
  const remainingSecs = seconds % 60;
  const timeDisplay = `${mins}:${remainingSecs.toString().padStart(2, '0')}`;

  return { colorClass, timeDisplay };
}
