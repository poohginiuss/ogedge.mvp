import Image from "next/image";
import Link from "next/link";

type Column = {
  title: string;
  links: string[];
};

const columns: Column[] = [
  {
    title: "OGEdge",
    links: [
      "About Us",
      "Safety",
      "Order Now",
      "F.A.Q.",
      "Contact Us",
      "Jobs",
      "Terms and Conditions",
      "Privacy Policy",
    ],
  },
  {
    title: "Popular Games",
    links: [
      "Apex Legends",
      "Call of Duty: Black Ops Cold War",
      "Call of Duty: Modern Warfare",
      "Destiny 2",
      "DOTA2",
      "Escape From Tarkov",
      "Everquest",
      "All games",
    ],
  },
  {
    title: "Coaching",
    links: [
      "League of Legends",
      "Valorant",
      "Call of Duty",
      "FIFA 21",
      "Destiny 2",
      "Apex Legends",
    ],
  },
  {
    title: "Blog",
    links: [
      "How we keep your account safe",
      "EA Backup codes",
      "Playing with us",
    ],
  },
];

const payments = [
  "visa",
  "mastercard",
  "paypal",
  "applepay",
  "gpay",
  "crypto",
  "skrill",
  "venmo",
  "zelle",
  "klarna",
  "wechatpay",
];

const socials = [
  "facebook",
  "twitter",
  "instagram",
  "discord",
  "skype",
  "whatsapp",
];

export function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-12 md:px-12 lg:px-20 lg:py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-x-12 md:gap-y-10 lg:gap-x-20">
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-2">
              <h3
                className="font-urbanist text-base font-bold uppercase"
                style={{ color: "var(--brand-deep)" }}
              >
                {col.title}
              </h3>
              <ul className="flex flex-col gap-1.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="font-urbanist text-sm leading-[25px] text-white/90 transition-colors hover:text-brand-light"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 h-px w-full bg-[#333]" />

        <div className="mt-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_auto_1fr]">
          <div className="flex flex-col gap-1 font-urbanist text-[13px] leading-[22px] text-text-faint">
            <p>OGEdge © 2006-2026 All Rights Reserved</p>
            <p>All trademarks and logos belong to their respective owners.</p>
            <p>OGEdge is not endorsed by or affiliated with any game publisher.</p>
            <p>
              Designed by <span className="text-white">Webcapitan</span>
            </p>
          </div>

          <div className="order-first flex justify-center lg:order-none">
            <Image
              src="/images/logos/logo-red.png"
              alt="OGEdge"
              width={180}
              height={58}
              className="h-12 w-auto md:h-[58px]"
            />
          </div>

          <div className="flex flex-col items-end gap-4 lg:items-end">
            <div className="grid grid-cols-6 gap-2">
              {payments.map((p) => (
                <div
                  key={p}
                  className="flex h-7 w-10 items-center justify-center rounded-md bg-white/5 px-1"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/payments/${p}.svg`}
                    alt={p}
                    loading="lazy"
                    className="max-h-6 max-w-9 object-contain"
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <Link
                  key={s}
                  href="#"
                  aria-label={s}
                  className="flex h-8 w-8 items-center justify-center bg-white/5 transition-colors hover:bg-white/10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/social/${s}.svg`}
                    alt={s}
                    loading="lazy"
                    className="h-6 w-6 object-contain"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
