import React from 'react';
import { MapPin } from 'lucide-react';
import { useStationStatus } from '../api/useTrackernet';
import Panel from './ui/Panel';
import SectionHeader from './ui/SectionHeader';
import LoadingState from './ui/LoadingState';
import StatePanel from './ui/StatePanel';
import { Skeleton } from './ui/Skeleton';

export default function StationStatusBoard() {
  const { data: stationStatuses, error, loading, lastUpdated } = useStationStatus();

  if (loading && !stationStatuses) return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="flex flex-col border-l-[6px] border-l-tfl-blue rounded-2xl border border-border-subtle bg-white p-5">
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-5 w-32 mb-3" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
  if (error) return <StatePanel tone="danger" title="Unable to load station status" message={error.message} />;
  if (stationStatuses && stationStatuses.length === 0) {
    return (
      <StatePanel
        tone="success"
        title="All clear"
        message="No active station-level disruptions or access issues are currently reported across the network."
      />
    );
  }

  return (
    <div>
      <SectionHeader
        icon={MapPin}
        title="Station status"
        description="Ongoing station-level closures, access restrictions, or lift disruptions."
        lastUpdated={lastUpdated}
        loading={loading}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stationStatuses.map((status) => (
          <Panel key={status.id} className="flex flex-col border-l-[6px] border-l-tfl-blue px-5 py-5">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-warning">
                <span>{status.statusDescription}</span>
              </div>
              <h3 className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-text-primary">{status.stationName}</h3>
              <p className="mt-2 text-sm leading-6 text-text-secondary">{status.statusDetails || 'No additional details provided.'}</p>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
