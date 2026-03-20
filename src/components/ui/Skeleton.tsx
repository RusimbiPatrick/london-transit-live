import React from 'react';
import { cn } from '../../lib/cn';

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-surface-muted', className)}
      {...props}
    />
  );
}

export function LineSkeleton() {
  return (
    <div className="rounded-2xl border border-border-subtle bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <Skeleton className="h-6 w-32 mb-2" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-2.5 w-2.5 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-full mt-3" />
          <Skeleton className="h-4 w-3/4 mt-2" />
        </div>
        <Skeleton className="h-5 w-5" />
      </div>
    </div>
  );
}

export function ArrivalSkeleton() {
  return (
    <div className="rounded-2xl border border-border-subtle bg-white">
      <div className="border-b border-border-soft px-5 py-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-3.5 w-3.5" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-6 w-24 mt-1" />
      </div>
      <div className="divide-y divide-border-soft">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between px-5 py-4">
            <div className="min-w-0 flex-1">
              <Skeleton className="h-5 w-32 mb-1" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-6 w-12" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function AlertSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border-l-[6px] border-l-border-subtle border-border-subtle bg-white">
      <div className="px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <Skeleton className="h-6 w-40 mb-2" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-2.5 w-2.5 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-full mt-3" />
          </div>
          <Skeleton className="h-5 w-5" />
        </div>
      </div>
      <div className="border-t border-border-soft px-4 pb-4 pt-3">
        <Skeleton className="h-20 w-full rounded-xl" />
      </div>
    </div>
  );
}
