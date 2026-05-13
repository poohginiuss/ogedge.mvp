type QuickSelectButtonProps = {
  topLabel: string;
  bottomLabel: string;
  selected: boolean;
  onClick: () => void;
};

export function QuickSelectButton({
  topLabel,
  bottomLabel,
  selected,
  onClick,
}: QuickSelectButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-2xl border py-3 text-white transition-all ${
        selected
          ? "border-[#ff975d] drop-shadow-[0_4px_7px_rgba(255,92,0,0.3)]"
          : "border-[#383852] shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
      }`}
      style={{
        backgroundImage: selected
          ? "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(90deg, #383852 0%, #383852 100%)"
          : "linear-gradient(90deg, #383852 0%, #383852 100%), linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%)",
      }}
    >
      <span className="font-body text-xs font-normal">{topLabel}</span>
      <span className="font-heading text-xl font-semibold">{bottomLabel}</span>
    </button>
  );
}
