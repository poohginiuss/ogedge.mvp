"use client";

import { Dropdown } from "@/components/ui/Dropdown";

export type CategoryOption = {
  id: string;
  icon: string;
  label: string;
};

type CategoryTabsProps = {
  options: CategoryOption[];
  value: string;
  onChange: (id: string) => void;
  /** Mobile heading shown above the dropdown */
  mobileLabel?: string;
};

export function CategoryTabs({
  options,
  value,
  onChange,
  mobileLabel = "Service Selection",
}: CategoryTabsProps) {
  return (
    <div>
      {/* Mobile dropdown */}
      <div className="md:hidden">
        <p className="mb-2 font-heading text-lg font-bold text-white">{mobileLabel}</p>
        <Dropdown
          label=""
          value={options.find((c) => c.id === value)?.label ?? ""}
          options={options.map((c) => c.label)}
          onChange={(label) => {
            const found = options.find((c) => c.label === label);
            if (found) onChange(found.id);
          }}
        />
      </div>
      {/* Desktop tabs */}
      <div className="hidden flex-wrap gap-2 md:flex">
        {options.map(({ id, icon, label }) => {
          const active = value === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={`inline-flex items-center gap-2 rounded-2xl px-4 py-3 transition-colors ${
                active ? "" : "hover:border-brand-light/60"
              }`}
              style={{
                background: "rgba(0,0,0,0.2)",
                border: active ? "2px solid #ff975d" : "1px solid #383852",
                ...(active ? { boxShadow: "0 4px 44px rgba(255,92,0,0.25)" } : {}),
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={icon} alt="" loading="lazy" className="h-[18px] w-[18px]" />
              <span
                className={`font-body text-base font-medium ${
                  active ? "text-brand-main" : "text-white"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
