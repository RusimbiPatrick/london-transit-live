import React from 'react';
import SectionHeader from './ui/SectionHeader';
import { BellRing } from 'lucide-react';
import { useLineStatusIncidents } from '../api/useTrackernet';
import Panel from './ui/Panel';
import LoadingState from './ui/LoadingState';
import StatePanel from './ui/StatePanel';
import { AlertSkeleton } from './ui/Skeleton';
import { getLineColorHex } from '../lib/transport';

export default function AlertsBoard() {
  const { data: incidentStatuses, error, loading, lastUpdated } = useLineStatusIncidents();

  if (loading && !incidentStatuses) return (
    <div className="space-y-3">
      {[1, 2].map(i => <AlertSkeleton key={i} />)}
    </div>
  );
  if (error) return <StatePanel tone="danger" title="Unable to load alerts" message={error.message} />;
  if (incidentStatuses && incidentStatuses.length === 0) {
    return (
      <StatePanel
        tone="success"
        title="All clear"
        message="There are currently no reported incidents or disruptions across the monitored network."
      />
    );
  }

  return (
    <div>
      <SectionHeader
        icon={BellRing}
        title="Active alerts"
        description="Ongoing incidents are listed here with relevant severity details and branch impact."
        lastUpdated={lastUpdated}
        loading={loading}
      />

      <div className="grid gap-3">
        {incidentStatuses.map((status) => {
          const lineColor = getLineColorHex(status.lineName);

          return (
            <Panel key={status.id} className="overflow-hidden border-l-[6px]" style={{ borderLeftColor: lineColor }}>
              <div className="px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-lg font-semibold tracking-tight text-text-primary">{status.statusDescription}</div>
                    <div className="mt-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: lineColor }} />
                      <span>{status.lineName}</span>
                    </div>
                    {status.statusDetails ? <p className="mt-3 text-sm leading-6 text-text-secondary line-clamp-2">{status.statusDetails}</p> : null}
                  </div>
                </div>
              </div>

              {status.statusDetails ? (
                <div className="border-t border-border-soft px-4 pb-4 pt-3">
                  <div className="rounded-xl border border-border-soft bg-surface-muted px-4 py-4 text-sm leading-6 text-text-secondary">
                    {status.statusDetails}
                  </div>
                  {status.branches?.length ? (
                    <div className="mt-3 space-y-3">
                      {status.branches.map((branch, index) => (
                        <Panel key={`${status.id}-${index}`} className="border-border-soft bg-surface-muted px-4 py-3">
                          <div className="text-sm font-semibold text-text-primary">
                            {branch.stationFrom || 'Unknown'} → {branch.stationTo || 'Unknown'}
                          </div>
                          <div className="mt-1 text-sm text-text-secondary">{branch.statusDescription}</div>
                        </Panel>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </Panel>
          );
        })}
      </div>
    </div>
  );
}
