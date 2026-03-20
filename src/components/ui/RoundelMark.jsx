import React from 'react';
import { cn } from '../../lib/cn';

export default function RoundelMark({ compact = false }) {
  return (
    <div className="relative flex items-center justify-center">
      <div className={cn('rounded-full border-[4px] border-tfl-blue', compact ? 'h-8 w-8' : 'h-10 w-10')} />
      <div className={cn('absolute rounded-full bg-tfl-red', compact ? 'h-2.5 w-10' : 'h-3 w-12')} />
    </div>
  );
}
