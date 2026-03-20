import React from 'react';

export default function LoadingState({ label = 'Fetching real-time updates…' }) {
  return (
    <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-border-subtle bg-white shadow-sm">
      <div className="flex flex-col items-center gap-4 text-text-secondary">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-border-subtle border-t-tfl-blue border-r-tfl-red" />
        <span className="text-sm font-medium">{label}</span>
      </div>
    </div>
  );
}
