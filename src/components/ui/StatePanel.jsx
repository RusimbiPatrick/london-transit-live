import React from 'react';

const TONE_MAP = {
  GS: {
    badge: 'border-border-success bg-bg-success text-success',
    panel: 'border-border-subtle bg-white',
    detail: 'border-border-soft bg-surface-muted text-text-secondary',
    statusText: 'text-success',
  },
  MD: {
    badge: 'border-border-warning bg-bg-warning text-warning',
    panel: 'border-border-warning bg-white',
    detail: 'border-border-warning bg-bg-warning text-warning',
    statusText: 'text-warning',
  },
  SD: {
    badge: 'border-border-danger bg-bg-danger text-danger',
    panel: 'border-border-danger bg-white',
    detail: 'border-border-danger bg-bg-danger text-danger',
    statusText: 'text-danger',
  },
  PS: {
    badge: 'border-border-danger bg-bg-danger text-danger',
    panel: 'border-border-danger bg-white',
    detail: 'border-border-danger bg-bg-danger text-danger',
    statusText: 'text-danger',
  },
  CS: {
    badge: 'border-border-danger bg-bg-danger text-danger',
    panel: 'border-border-danger bg-white',
    detail: 'border-border-danger bg-bg-danger text-danger',
    statusText: 'text-danger',
  },
  default: {
    badge: 'border-border-subtle bg-surface-muted text-text-primary',
    panel: 'border-border-subtle bg-white',
    detail: 'border-border-soft bg-surface-muted text-text-secondary',
    statusText: 'text-text-primary',
  },
};

export default function StatePanel({ icon: Icon, tone = 'neutral', title, message }) {
  const toneClasses = TONE_MAP[tone] || TONE_MAP.default;

  return (
    <div className={`rounded-3xl border px-8 py-12 text-center shadow-sm ${toneClasses.panel}`}>
      {Icon ? (
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-border-subtle bg-surface-muted text-text-primary">
          <Icon className="h-6 w-6" />
        </div>
      ) : null}
      <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
      {message ? <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-text-secondary">{message}</p> : null}
    </div>
  );
}
