type DividerProps = {
  orientation?: "horizontal" | "vertical";
  className?: string;
};

export function Divider({ orientation = "horizontal", className = "" }: DividerProps) {
  const base = orientation === "horizontal" ? "h-px w-full" : "h-full w-px";
  return <div aria-hidden className={`bg-dark-border ${base} ${className}`} />;
}
