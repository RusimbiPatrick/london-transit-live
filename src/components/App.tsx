import React, { useMemo, useState } from 'react';
import { BellRing, Clock3, List, MapPin } from 'lucide-react';
import LineStatusBoard from './LineStatusBoard';
import ArrivalsBoard from './ArrivalsBoard';
import StationStatusBoard from './StationStatusBoard';
import AlertsBoard from './AlertsBoard';
import RoundelMark from './ui/RoundelMark';
import { cn } from '../lib/cn';

const TABS = [
  { id: 'lines', label: 'Status', icon: List },
  { id: 'alerts', label: 'Alerts', icon: BellRing },
  { id: 'arrivals', label: 'Arrivals', icon: Clock3 },
  { id: 'stations', label: 'Stations', icon: MapPin },
] as const;

export default function App() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]['id']>('lines');

  const activePanel = useMemo(() => {
    if (activeTab === 'alerts') return <AlertsBoard />;
    if (activeTab === 'arrivals') return <ArrivalsBoard />;
    if (activeTab === 'stations') return <StationStatusBoard />;
    return <LineStatusBoard />;
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-surface-page text-text-primary selection:bg-selection">
      <header className="border-b border-border-subtle bg-surface-base md:sticky md:top-0 md:z-40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <RoundelMark />
            <div className="text-sm font-semibold tracking-[0.18em] uppercase">London transit.live</div>
          </div>
          <nav aria-label="Primary" className="hidden overflow-hidden border border-border-subtle bg-white md:flex">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'relative min-w-28 border-r border-border-subtle px-4 py-3 text-left transition duration-150 last:border-r-0',
                    active ? 'bg-surface-raised text-text-primary' : 'bg-white text-text-secondary hover:bg-surface-raised',
                  )}
                >
                  {active ? <span className="absolute inset-x-0 top-0 h-0.5 bg-tfl-red" /> : null}
                  <div className="mb-2 flex items-center justify-between">
                    <Icon className="h-4 w-4" />
                    {active ? <span className="h-2 w-2 rounded-full bg-tfl-blue" /> : null}
                  </div>
                  <div className="text-sm font-semibold">{tab.label}</div>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 pb-24 sm:px-6 lg:px-8 md:pb-8">{activePanel}</main>

      <nav aria-label="Mobile primary" className="fixed inset-x-0 bottom-0 z-50 border-t border-border-subtle bg-surface-base md:hidden">
        <div className="grid grid-cols-4">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                aria-current={active ? 'page' : undefined}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'relative flex flex-col items-center gap-1 border-r border-border-subtle px-2 py-3 text-center transition duration-150 last:border-r-0',
                  active ? 'bg-surface-raised text-text-primary' : 'bg-surface-base text-text-secondary',
                )}
              >
                {active ? <span className="absolute inset-x-0 top-0 h-0.5 bg-tfl-red" /> : null}
                <Icon className="h-4 w-4" />
                <span className="text-[11px] font-semibold tracking-[0.08em] uppercase">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
