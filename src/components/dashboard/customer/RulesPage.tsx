"use client";

import { useRouter } from "next/navigation";
import { IconChip } from "../atoms";
import { userProfile } from "../dashboardData";
import { CtaCard, ProfileIdentity } from "../molecules";

const rules = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
];

function ProfileBadges() {
  return (
    <div className="flex items-center gap-2">
      <IconChip
        background="rgba(255,92,0,0.2)"
        color="#ff5c00"
        icon="/images/dashboard/icons/medal-star-orange.svg"
      >
        {userProfile.tierName}
      </IconChip>
      <IconChip
        background="rgba(52,168,83,0.2)"
        color="#34a853"
        icon="/images/dashboard/icons/wallet-green.svg"
        size="sm"
        weight="semibold"
      >
        {userProfile.walletBalance}
      </IconChip>
    </div>
  );
}

function DesktopSidebar({
  onNewOrder,
  onSupport,
  onProfileClick,
}: {
  onNewOrder: () => void;
  onSupport: () => void;
  onProfileClick: () => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div
        className="flex flex-col gap-12 overflow-hidden rounded-3xl px-8 py-6"
        style={{ background: "rgba(56,56,82,0.3)" }}
      >
        <ProfileIdentity
          avatarSrc={userProfile.avatarUrl}
          avatarSize={90}
          welcomeText="Welcome,"
          welcomeClassName="font-body text-xl"
          name={userProfile.username}
          nameClassName="font-heading text-[32px] font-semibold leading-none"
          meta={<ProfileBadges />}
          groupWelcomeName
          onAvatarClick={onProfileClick}
        />

        <div className="flex flex-col gap-2">
          <CtaCard
            icon="/images/dashboard/icons/pen-new-order.svg"
            title="New Order"
            subtitle="Get Started"
            onClick={onNewOrder}
          />
          <CtaCard
            icon="/images/dashboard/icons/support-icon.svg"
            title="Customer Support"
            subtitle="Create Ticket"
            onClick={onSupport}
          />
        </div>
      </div>
    </div>
  );
}

export default function RulesPage() {
  const router = useRouter();
  const handleNewOrder = () => router.push("/");
  const handleSupport = () => router.push("/app/customer/support");
  const handleProfile = () => router.push("/app/customer/profile");

  return (
    <>
      {/* Mobile: profile + CTA cards */}
      <div className="flex flex-col gap-6 xl:hidden">
        <div className="flex items-center gap-4">
          <ProfileIdentity
            avatarSrc={userProfile.avatarUrl}
            avatarSize={64}
            welcomeText="Welcome,"
            welcomeClassName="font-body text-xs leading-[18px] text-white"
            name={userProfile.username}
            nameClassName="font-body text-base font-bold leading-6 text-white"
            meta={<ProfileBadges />}
            groupWelcomeName
            onAvatarClick={handleProfile}
          />
        </div>

        <div className="flex items-stretch gap-2">
          <button
            type="button"
            onClick={handleNewOrder}
            className="flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl bg-[#21222f] p-4 transition-all active:scale-[0.97]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dashboard/icons/pen-new-order.svg" alt="" className="h-8 w-8 [filter:brightness(0)_saturate(100%)_invert(55%)_sepia(92%)_saturate(600%)_hue-rotate(340deg)_brightness(100%)_contrast(100%)]" />
            <span className="font-body text-base font-bold uppercase text-white">New Order</span>
            <span className="font-body text-sm text-white">Get Started</span>
          </button>
          <button
            type="button"
            onClick={handleSupport}
            className="flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl bg-[#21222f] p-4 transition-all active:scale-[0.97]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dashboard/icons/support-icon.svg" alt="" className="h-8 w-8 [filter:brightness(0)_saturate(100%)_invert(55%)_sepia(92%)_saturate(600%)_hue-rotate(340deg)_brightness(100%)_contrast(100%)]" />
            <span className="font-body text-base font-bold uppercase text-white">Support</span>
            <span className="font-body text-sm text-white">Create Ticket</span>
          </button>
        </div>
      </div>

      {/* Two-column layout on desktop */}
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        {/* Left: Rules list */}
        <div className="flex flex-1 flex-col gap-4 lg:gap-6">
          <h1 className="font-heading text-xl font-bold text-white lg:text-[32px]">
            Customer Duties
          </h1>

          <div className="flex flex-col gap-4">
            {rules.map((text, i) => {
              const num = String(i + 1).padStart(2, "0");
              return (
                <div
                  key={i}
                  className="flex flex-col gap-4 rounded-2xl px-6 py-4 lg:flex-row lg:items-start lg:gap-4 lg:p-4"
                  style={{ background: "rgba(56,56,82,0.5)" }}
                >
                  <span className="font-heading text-[30px] font-bold leading-[38px] text-brand-light">
                    {num}
                  </span>
                  <p className="flex-1 font-body text-base leading-6 text-white">
                    {text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Desktop sidebar with profile + CTAs */}
        <div className="hidden xl:block xl:w-[490px] xl:shrink-0">
          <DesktopSidebar onNewOrder={handleNewOrder} onSupport={handleSupport} onProfileClick={handleProfile} />
        </div>
      </div>
    </>
  );
}
