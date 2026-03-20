import React from 'react';
import { cn } from '../../lib/cn';

export default function StatusBadge({ icon: Icon, children, className = '' }) {
  return (
    <div className={cn('inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold', className)}>
      {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
      <span>{children}</span>
    </div>
  );
}
