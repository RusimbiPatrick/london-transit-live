import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function SelectField({ label, value, onChange, options }) {
  return (
    <div className="relative">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-text-subtle">{label}</span>
      <div className="relative rounded-2xl border border-border-subtle bg-white transition duration-150 focus-within:border-border-hover focus-within:ring-2 focus-within:ring-selection/30">
        <select
          value={value}
          onChange={onChange}
          className="w-full appearance-none rounded-2xl bg-transparent px-4 py-3 text-sm font-medium text-text-primary outline-none"
        >
          {options.map((option) => (
            <option key={option.code} value={option.code} className="bg-white text-text-primary">
              {option.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-text-subtle">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
