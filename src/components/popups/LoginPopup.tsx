"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

type View = "sign-in" | "guest";

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginPopup({ isOpen, onClose }: LoginPopupProps) {
  const [view, setView] = useState<View>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  function resetAndClose() {
    setEmail("");
    setPassword("");
    setView("sign-in");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={resetAndClose} />
      <div
        className="relative w-[90%] max-w-[542px] max-h-[94vh] overflow-y-auto rounded-3xl border border-[#383852] backdrop-blur-[12px]"
        style={{
          backgroundImage:
            "linear-gradient(136deg, rgba(56,56,82,0.5) 0%, rgba(35,35,48,0.5) 50%, rgba(23,25,31,0.5) 100%)",
        }}
      >
        {/* Header */}
        <div className="flex flex-col gap-4 pt-6">
          <div className="flex items-center gap-2.5 px-6">
            <h2 className="flex-1 font-body text-2xl font-medium leading-8 text-white">
              {view === "sign-in" ? "Sign In" : "Sign In as a Guest"}
            </h2>
            <button
              type="button"
              onClick={resetAndClose}
              className="cursor-pointer transition-opacity hover:opacity-80"
              aria-label="Close"
            >
              <Image
                src="/images/popups/close-icon.svg"
                alt=""
                width={18}
                height={20}
                className="h-5 w-[18px]"
              />
            </button>
          </div>
          <div className="h-px w-full bg-[#383852]" />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 px-6 pb-6 pt-4">
          {view === "sign-in" ? (
            <SignInForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          ) : (
            <GuestForm
              email={email}
              setEmail={setEmail}
            />
          )}

          {/* OR divider */}
          <div className="flex items-center gap-2.5">
            <div className="h-px flex-1 bg-[#383852]" />
            <span className="font-body text-sm uppercase text-[#383852]">or</span>
            <div className="h-px flex-1 bg-[#383852]" />
          </div>

          {/* Social Login */}
          <div className="flex gap-5">
            <button
              type="button"
              className="flex flex-1 cursor-pointer flex-col items-center gap-1.5 rounded-2xl border border-transparent bg-[#232330] px-5 py-3 transition-all hover:border-[#ff975d]/50 hover:shadow-[0_0_16px_rgba(255,92,0,0.2)] active:scale-[0.97]"
            >
              <Image src="/images/popups/logo-facebook.svg" alt="Facebook" width={24} height={24} className="size-6" />
              <span className="font-body text-base font-semibold text-white">Facebook</span>
            </button>
            <button
              type="button"
              className="flex flex-1 cursor-pointer flex-col items-center gap-1.5 rounded-2xl border border-transparent bg-[#232330] px-5 py-3 transition-all hover:border-[#ff975d]/50 hover:shadow-[0_0_16px_rgba(255,92,0,0.2)] active:scale-[0.97]"
            >
              <Image src="/images/popups/logo-google.svg" alt="Google" width={24} height={24} className="size-6" />
              <span className="font-body text-base font-semibold text-white">Google</span>
            </button>
          </div>

          {/* Continue as Guest — only on sign-in view */}
          {view === "sign-in" && (
            <button
              type="button"
              onClick={() => setView("guest")}
              className="flex w-full cursor-pointer items-center justify-center rounded-3xl border border-transparent bg-[#232330] px-6 py-4 font-body text-base font-bold uppercase tracking-wider text-white transition-all hover:border-[#ff975d]/50 hover:shadow-[0_0_16px_rgba(255,92,0,0.2)] active:scale-[0.97]"
            >
              Continue as a Guest
            </button>
          )}

          {/* Register link */}
          <div className="flex items-center justify-center gap-2">
            <span className="font-body text-base text-white">
              {view === "sign-in" ? "Don\u2019t have an account?" : "Want to create an account?"}
            </span>
            <button
              type="button"
              className="cursor-pointer font-body text-base font-bold text-white transition-opacity hover:opacity-80"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Sign In Form ─────────────────────────────────────────────────── */

function SignInForm({
  email,
  setEmail,
  password,
  setPassword,
}: {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
}) {
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-4">
          <LoginField label="Email Address*" value={email} onChange={setEmail} placeholder="Start typing..." />
          <LoginField label="Password*" value={password} onChange={setPassword} placeholder="******" type="password" />
        </div>
        <div className="flex justify-end">
          <button type="button" className="cursor-pointer font-body text-base text-white transition-opacity hover:opacity-80">
            Forgot password
          </button>
        </div>
      </div>

      <Button variant="secondary" size="sm" className="w-full">
        Login
      </Button>
    </>
  );
}

/* ── Guest Form ───────────────────────────────────────────────────── */

function GuestForm({
  email,
  setEmail,
}: {
  email: string;
  setEmail: (v: string) => void;
}) {
  return (
    <>
      <div className="flex flex-col gap-3">
        <LoginField label="Email Address*" value={email} onChange={setEmail} placeholder="Start typing..." />
        <p className="font-body text-base leading-6 text-white">
          Continue without creating an account. You&apos;ll receive order updates and can track progress via the link in your email.
        </p>
      </div>

      <Button variant="secondary" size="sm" className="w-full">
        Continue as a Guest
      </Button>
    </>
  );
}

/* ── Shared input field ───────────────────────────────────────────── */

function LoginField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-body text-base font-medium leading-6 text-white">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[#383852] bg-[rgba(0,0,0,0.7)] px-[18px] py-[14px] font-body text-sm leading-5 text-white/80 outline-none placeholder:text-white/80 focus:border-[#ff975d]"
      />
    </div>
  );
}
