import React from 'react';
import { formatLastUpdated } from '../../lib/transport';

export default function SectionHeader({ icon: Icon, title, description, lastUpdated, loading = false }) {
  return (
    <header className="mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
      <div className="min-w-0 flex-1">
        <div className="mb-3 flex items-center gap-3">
          {Icon ? <Icon className="h-6 w-6 text-tfl-blue" /> : null}
          <h2 className="text-3xl font-semibold tracking-tight text-text-primary">{title}</h2>
        </div>
        {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">{description}</p> : null}
      </div>

      <div className="flex flex-col items-start sm:items-end sm:text-right">
        <div className="text-xs font-medium uppercase tracking-[0.22em] text-text-subtle">Last refresh</div>
        <div className="mt-1 text-sm font-medium text-text-primary">{formatLastUpdated(lastUpdated, loading)}</div>
      </div>
    </header>
  );
}
