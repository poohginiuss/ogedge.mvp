"use client";

import Image from "next/image";

export function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-[#232330] p-4">
      <Image
        src="/images/popups/info-icon.svg"
        alt=""
        width={20}
        height={20}
        className="mt-0.5 size-5 shrink-0"
      />
      <p className="font-body text-sm text-white/90">{children}</p>
    </div>
  );
}

export function WarningBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-[#232330] p-4">
      <span className="mt-0.5 shrink-0 text-base leading-none" aria-hidden>
        ⚠️
      </span>
      <p className="font-body text-sm text-white/90">{children}</p>
    </div>
  );
}

interface AmountOptionProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function AmountOption({ label, selected, onClick }: AmountOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex h-[44px] cursor-pointer items-center justify-center rounded-xl border font-body text-base font-bold transition-all hover:border-[#ff975d] active:scale-[0.97] ${
        selected
          ? "border-[#ff975d] text-[#ff975d] drop-shadow-[0px_4px_7px_rgba(255,92,0,0.3)]"
          : "border-[#383852] bg-[rgba(0,0,0,0.2)] text-white shadow-[0px_4px_16px_0px_rgba(0,0,0,0.15)]"
      }`}
      style={
        selected
          ? {
              backgroundImage:
                "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(90deg, #383852 0%, #383852 100%)",
            }
          : undefined
      }
    >
      {selected && (
        <Image
          src="/images/popups/check-active.svg"
          alt=""
          width={12}
          height={12}
          className="absolute right-3 top-3 size-3"
        />
      )}
      {label}
    </button>
  );
}

export function CustomAmountInput({
  value,
  onChange,
  onFocus,
  placeholder = "0",
  type = "number",
}: {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  type?: "number" | "text";
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
      placeholder={placeholder}
      className="col-span-2 h-[44px] rounded-xl border border-[#383852] bg-[rgba(0,0,0,0.2)] px-4 text-center font-body text-base font-bold text-white shadow-[0px_4px_16px_0px_rgba(0,0,0,0.15)] outline-none placeholder:text-white/50 focus:border-[#ff975d]"
    />
  );
}

type PaymentMethod = "card" | "paypal" | "crypto";

const PAYMENT_METHODS: {
  id: PaymentMethod;
  label: string;
  logo: { src: string; width: number; height: number; className?: string };
  cards: string[];
}[] = [
  {
    id: "card",
    label: "Card",
    logo: { src: "/images/popups/stripe-logo.svg", width: 38, height: 16 },
    cards: [
      "/images/popups/visa.svg",
      "/images/popups/mastercard.svg",
      "/images/popups/mastercard.svg",
      "/images/popups/mastercard.svg",
      "/images/popups/mastercard.svg",
      "/images/popups/mastercard.svg",
      "/images/popups/mastercard.svg",
      "/images/popups/mastercard.svg",
    ],
  },
  {
    id: "paypal",
    label: "PayPal",
    logo: {
      src: "/images/popups/paypal-logo.png",
      width: 44,
      height: 16,
    },
    cards: [
      "/images/popups/paypal-card.svg",
      "/images/popups/paypal-card.svg",
      "/images/popups/paypal-card.svg",
      "/images/popups/paypal-card.svg",
      "/images/popups/paypal-card.svg",
      "/images/popups/paypal-card.svg",
    ],
  },
  {
    id: "crypto",
    label: "Crypto",
    logo: {
      src: "/images/popups/coinbase-logo.png",
      width: 56,
      height: 10,
      className: "h-[10px] w-[56px]",
    },
    cards: [
      "/images/popups/paypal-card.svg",
      "/images/popups/paypal-card.svg",
      "/images/popups/paypal-card.svg",
      "/images/popups/paypal-card.svg",
      "/images/popups/paypal-card.svg",
      "/images/popups/paypal-card.svg",
    ],
  },
];

export function PaymentMethodSection({
  selected,
  onSelect,
}: {
  selected: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Image
          src="/images/popups/payment-icon.svg"
          alt=""
          width={24}
          height={24}
          className="size-6"
        />
        <span className="font-body text-base font-semibold text-white">
          Payment Method
        </span>
      </div>
      <div className="flex flex-col gap-2.5 lg:flex-row">
        {PAYMENT_METHODS.map((method) => {
          const isActive = selected === method.id;
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onSelect(method.id)}
              className={`flex cursor-pointer flex-row items-center gap-3 rounded-xl border bg-[rgba(0,0,0,0.2)] px-3 py-3 transition-all hover:border-[#ff975d] active:scale-[0.98] lg:h-[90px] lg:flex-1 lg:flex-col lg:gap-3 lg:py-4 ${
                isActive ? "border-[#ff975d]" : "border-[#383852]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Image
                  src={
                    isActive
                      ? "/images/popups/radio-active.svg"
                      : "/images/popups/radio-inactive.svg"
                  }
                  alt=""
                  width={24}
                  height={24}
                  className="size-6"
                />
                <span className="font-body text-base font-medium text-white">
                  {method.label}
                </span>
                <Image
                  src={method.logo.src}
                  alt={method.label}
                  width={method.logo.width}
                  height={method.logo.height}
                  className={method.logo.className ?? ""}
                />
              </div>
              {method.cards.length > 0 && (
                <div className="ml-auto flex flex-wrap gap-1 lg:ml-0 lg:justify-center lg:px-2">
                  {method.cards.map((card, idx) => (
                    <Image
                      key={`${card}-${idx}`}
                      src={card}
                      alt=""
                      width={22}
                      height={14}
                      className="h-[14px] w-[22px]"
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function PopupTextarea({
  label,
  optional,
  value,
  onChange,
  placeholder,
  className,
}: {
  label: string;
  optional?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="font-body text-base font-normal text-white">{label}</span>
        {optional && (
          <span className="font-body text-xs font-light text-white/80">Optional</span>
        )}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`h-[56px] w-full resize-none rounded-xl border border-[#383852] bg-[rgba(0,0,0,0.7)] p-3 font-body text-sm text-white/80 outline-none placeholder:text-white/80 focus:border-[#ff975d] ${className ?? ""}`}
      />
    </div>
  );
}

export function TotalAmountRow({ amount }: { amount: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-[rgba(0,0,0,0.2)] p-4">
      <span className="font-body text-sm text-white/80">Total Amount</span>
      <span className="font-body text-lg font-semibold text-[#ff975d]">
        {amount}
      </span>
    </div>
  );
}

export function CancelButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 cursor-pointer rounded-2xl border border-[#ff975d] px-6 py-3 font-body text-base font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
    >
      {children}
    </button>
  );
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex flex-1 cursor-pointer items-center justify-center rounded-2xl border border-[#ff975d] bg-gradient-to-r from-[#ff5c00] to-[#a32d05] px-6 py-3 font-body text-base font-bold uppercase tracking-wider text-white drop-shadow-[0px_4px_12px_rgba(255,92,0,0.4)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

export function OutlineButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 cursor-pointer rounded-2xl border border-[#ff975d] px-6 py-3 font-body text-base font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90 ${className ?? ""}`}
    >
      {children}
    </button>
  );
}

export function ActionButtonsRow({ children }: { children: React.ReactNode }) {
  return <div className="flex w-full flex-col gap-3 lg:flex-row lg:gap-4">{children}</div>;
}

export function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-body text-base font-normal text-white">{label}</label>
      {children}
    </div>
  );
}

export function FormInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-[#383852] bg-[rgba(0,0,0,0.7)] px-4 py-3 font-body text-sm text-white/80 outline-none placeholder:text-white/80 focus:border-[#ff975d]"
    />
  );
}

export function FormSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full cursor-pointer appearance-none rounded-xl border border-[#383852] bg-[rgba(0,0,0,0.7)] px-4 py-3 font-body text-sm text-white/80 outline-none focus:border-[#ff975d]"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        aria-hidden
      >
        <path
          d="M1 1.5L6 6.5L11 1.5"
          stroke="#ff975d"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function AttachmentButtons() {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        className="flex size-10 cursor-pointer items-center justify-center rounded-xl border border-[#383852] transition-colors hover:border-[#ff975d]"
        aria-label="Attach image"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <rect
            x="2"
            y="2"
            width="12"
            height="12"
            rx="2"
            stroke="white"
            strokeOpacity="0.6"
          />
          <circle cx="5.5" cy="5.5" r="1.5" fill="white" fillOpacity="0.6" />
          <path d="M2 12L6 8L10 12L14 6" stroke="white" strokeOpacity="0.6" />
        </svg>
      </button>
      <button
        type="button"
        className="flex size-10 cursor-pointer items-center justify-center rounded-xl border border-[#383852] transition-colors hover:border-[#ff975d]"
        aria-label="Upload file"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M14 10L14 12C14 13.1046 13.1046 14 12 14L4 14C2.89543 14 2 13.1046 2 12L2 10"
            stroke="white"
            strokeOpacity="0.6"
            strokeLinecap="round"
          />
          <path
            d="M8 2L8 10M8 10L5 7M8 10L11 7"
            stroke="white"
            strokeOpacity="0.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export function StarRating({
  rating,
  onRate,
  filledColor = "#ff975d",
  emptyColor = "#383852",
  size = 32,
}: {
  rating: number;
  onRate: (star: number) => void;
  filledColor?: string;
  emptyColor?: string;
  size?: number;
}) {
  return (
    <div className="flex gap-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRate(star)}
          className="cursor-pointer transition-transform hover:scale-105"
          aria-label={`Rate ${star} stars`}
        >
          <svg
            width={size}
            height={size * 0.95}
            viewBox="0 0 39 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.5 0L24.1 14.1H39L26.9 22.8L31.5 37L19.5 28.2L7.5 37L12.1 22.8L0 14.1H14.9L19.5 0Z"
              fill={star <= rating ? filledColor : emptyColor}
            />
          </svg>
        </button>
      ))}
    </div>
  );
}

export function SuccessBadge() {
  return (
    <div className="relative mx-auto flex size-[160px] items-center justify-center">
      <Image
        src="/images/popups/success-badge.svg"
        alt=""
        width={260}
        height={260}
        className="size-full object-contain"
      />
    </div>
  );
}

export function ResponseTimeRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full items-center justify-between rounded-xl bg-[rgba(0,0,0,0.2)] p-4">
      <span className="font-body text-sm text-white/80">{label}</span>
      <span className="font-body text-lg font-semibold text-[#ff975d]">
        {value}
      </span>
    </div>
  );
}
