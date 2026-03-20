import React, { useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, List, XCircle } from 'lucide-react';
import { useLineStatus } from '../api/useTrackernet';
import Panel from './ui/Panel';
import SectionHeader from './ui/SectionHeader';
import StatePanel from './ui/StatePanel';
import LoadingState from './ui/LoadingState';
import { getLineColorHex, getStatusPriority, getToneClasses } from '../lib/transport';

function getStatusPresentation(statusId) {
  if (statusId === 'MD') return { icon: AlertTriangle };
  if (statusId === 'SD' || statusId === 'PS' || statusId === 'CS') return { icon: XCircle };
  return { icon: CheckCircle2 };
}

export default function LineStatusBoard() {
  const { data: lineStatuses, error, loading, lastUpdated } = useLineStatus();
  const [expandedLines, setExpandedLines] = useState(new Set());

  const sortedStatuses = useMemo(() => {
    return [...(lineStatuses || [])].sort((a, b) => {
      const priorityDelta = getStatusPriority(a.statusId) - getStatusPriority(b.statusId);
      if (priorityDelta !== 0) return priorityDelta;
      return a.lineName.localeCompare(b.lineName);
    });
  }, [lineStatuses]);

  const disruptions = useMemo(() => sortedStatuses.filter((status) => status.statusId !== 'GS').length, [sortedStatuses]);

  const toggleLine = (lineId) => {
    setExpandedLines((current) => {
      const next = new Set(current);
      if (next.has(lineId)) next.delete(lineId);
      else next.add(lineId);
      return next;
    });
  };

  if (!import.meta.env.VITE_TFL_APP_KEY) return <StatePanel icon={AlertTriangle} tone="danger" title="TfL API key required" message="Add VITE_TFL_APP_KEY to load live line status." />;
  if (loading && !lineStatuses) return <LoadingState label="Fetching live line status…" />;
  if (error) return <StatePanel icon={AlertTriangle} tone="danger" title="Unable to load line status" message={error.message} />;
  if (lineStatuses && lineStatuses.length === 0) return <StatePanel title="No line data returned" message="The TfL endpoint responded without any line status entries." />;

  return (
    <div>
      <SectionHeader
        icon={List}
        title="Line status"
        description={disruptions ? `${disruptions} disrupted lines are sorted to the top.` : 'All monitored lines are currently sorted by service health.'}
        lastUpdated={lastUpdated}
        loading={loading}
      />

      <div className="grid gap-3">
        {sortedStatuses.map((status) => {
          const isExpanded = expandedLines.has(status.id);
          const isDisrupted = status.statusId !== 'GS';
          const tone = getToneClasses(status.statusId);
          const { icon: StatusIcon } = getStatusPresentation(status.statusId);
          const lineColor = getLineColorHex(status.lineName);

          return (
            <Panel key={status.id} interactive className={`${tone.panel} overflow-hidden border-l-[6px]`} style={{ borderLeftColor: lineColor }}>
              <button type="button" className="w-full px-4 py-4 text-left" onClick={() => isDisrupted && toggleLine(status.id)}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className={`text-lg font-semibold tracking-tight ${tone.statusText}`}>{status.statusDescription}</div>
                    <div className="mt-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: lineColor }} />
                      <span>{status.lineName}</span>
                    </div>
                    {status.statusDetails ? <p className="mt-3 text-sm leading-6 text-text-secondary line-clamp-2">{status.statusDetails}</p> : null}
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <StatusIcon className={`h-5 w-5 ${tone.statusText}`} />
                    {isDisrupted ? (isExpanded ? <ChevronUp className="h-4 w-4 text-text-subtle" /> : <ChevronDown className="h-4 w-4 text-text-subtle" />) : null}
                  </div>
                </div>
              </button>

              {isExpanded ? (
                <div className="border-t border-border-soft px-4 pb-4 pt-3">
                  <div className={`rounded-xl border border-border-soft px-4 py-4 text-sm leading-6 ${tone.detail}`}>{status.statusDetails || 'No additional details provided.'}</div>
                  {status.branches?.length ? (
                    <div className="mt-3 space-y-3">
                      {status.branches.map((branch, index) => (
                        <Panel key={`${status.id}-${index}`} className="border-border-soft bg-surface-muted px-4 py-3">
                          <div className="text-sm font-semibold text-text-primary">{branch.stationFrom || 'Unknown'} → {branch.stationTo || 'Unknown'}</div>
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
