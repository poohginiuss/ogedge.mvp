"use client";

import { useState } from "react";

type CollapsibleListProps = {
  title: string;
  items: string[];
};

export function CollapsibleList({ title, items }: CollapsibleListProps) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{
        border: "1px solid #6d6d96",
        background:
          "linear-gradient(170deg, rgba(56,56,82,0.5) 0%, rgba(43,45,77,0.5) 50%, rgba(13,15,21,0.5) 100%)",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-body text-base font-medium text-white">{title}</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/icons/services/arrow-up.svg"
          alt=""
          className={`h-5 w-5 opacity-70 transition-transform duration-200 ${open ? "" : "rotate-180"}`}
        />
      </button>
      {open && (
        <ul className="flex flex-col gap-3 px-5 pb-4">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/icons/services/check.svg"
                alt=""
                loading="lazy"
                className="mt-0.5 h-[18px] w-[18px] shrink-0"
              />
              <span className="font-body text-sm text-white/90">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
