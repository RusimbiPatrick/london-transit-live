import React from 'react';
import { cn } from '../../lib/cn';

export default function Panel({ children, interactive = false, className = '', style = {} }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border-subtle bg-white',
        interactive && 'transition duration-150 hover:border-border-hover hover:bg-surface-hover',
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
