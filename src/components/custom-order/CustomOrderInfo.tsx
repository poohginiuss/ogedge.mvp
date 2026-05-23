import Image from "next/image";

export function CustomOrderInfo() {
  return (
    <div className="relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-3xl p-6 lg:p-8">
      <Image
        src="/images/custom-order/info-panel-bg.png"
        alt=""
        fill
        className="object-cover opacity-20"
      />
      <div className="relative z-10 flex flex-col gap-2 text-white">
        <h2 className="font-heading text-2xl font-bold leading-[38px] md:text-[30px] lg:max-w-[483px]">
          Need something done that isn&apos;t on the site?
        </h2>
        <p className="font-body text-base font-normal leading-7 text-white lg:text-lg">
          Place a custom order for any game service not listed on our site. Our
          team will review it and get in touch with you to confirm the details
          and pricing.
        </p>
      </div>

      <div className="relative z-10 flex items-center rounded-2xl bg-[#17191f] p-4">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <Image
              src="/images/custom-order/info-icon.svg"
              alt=""
              width={20}
              height={20}
              className="shrink-0"
            />
            <span className="font-body text-base font-medium leading-6 text-white">
              Disclaimer
            </span>
          </div>
          <p className="pl-7 font-body text-sm font-normal leading-5 text-white/90">
            Custom orders are subject to availability and may require additional
            review time. Pricing is determined based on the complexity and scope
            of the service requested. Our team will confirm final pricing before
            processing any payment.
          </p>
        </div>
      </div>
    </div>
  );
}
