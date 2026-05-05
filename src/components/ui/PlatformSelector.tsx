"use client";

type PlatformOption = {
  id: string;
  label: string;
  icon: string;
};

type PlatformSelectorProps = {
  options: PlatformOption[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
};

export function PlatformSelector({
  options,
  value,
  onChange,
  className = "",
}: PlatformSelectorProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-2 ${className}`}>
      {options.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className="relative flex h-[50px] items-center justify-center gap-[10px] rounded-2xl px-4 transition-all"
            style={{
              border: active ? "1px solid #ff975d" : "1px solid #383852",
              backgroundImage: active
                ? "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(90deg, #383852 0%, #383852 100%)"
                : "none",
              background: active ? undefined : "rgba(0,0,0,0.2)",
              boxShadow: active
                ? "0 4px 8px rgba(0,0,0,0.15), 0 4px 7px rgba(255,92,0,0.3)"
                : "0 4px 8px rgba(0,0,0,0.15)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={opt.icon}
              alt=""
              className="h-4 w-4"
              style={
                active
                  ? {
                      filter:
                        "brightness(0) saturate(100%) invert(39%) sepia(98%) saturate(1847%) hue-rotate(5deg) brightness(101%) contrast(106%)",
                    }
                  : undefined
              }
            />
            <span
              className={`font-body text-base font-medium leading-6 ${
                active ? "text-[#ff5c00]" : "text-white"
              }`}
            >
              {opt.label}
            </span>
            {active && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src="/images/icons/services/platform-check.svg"
                alt=""
                className="absolute right-1.5 top-1.5 h-3 w-3"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
