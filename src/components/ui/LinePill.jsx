import React from 'react';
import { getLineColorHex } from '../../lib/transport';

export default function LinePill({ lineName }) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-border-subtle bg-white px-3 py-2">
      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: getLineColorHex(lineName) }} />
      <span className="text-sm font-semibold text-text-primary">{lineName}</span>
    </div>
  );
}
