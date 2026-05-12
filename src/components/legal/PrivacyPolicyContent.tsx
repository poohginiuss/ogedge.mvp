import { ContactMethods } from "@/components/about/ContactMethods";
import { RatingCards } from "@/components/about/RatingCards";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageHero } from "@/components/sections/PageHero";

type Section = {
  heading: string;
  paragraphs: string[];
  callout?: string;
};

const sections: Section[] = [
  {
    heading: "Information Collection And Use",
    paragraphs: [
      'While using our Site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to your name ("Personal Information").',
    ],
  },
  {
    heading: "Log Data",
    paragraphs: [
      'Like many site operators, we collect information that your browser sends whenever you visit our Site ("Log Data").',
      'This Log Data may include information such as your computer\'s Internet Protocol ("IP") address, browser type, browser version, the pages of our Site that you visit, the time and date of your visit, the time spent on those pages and other statistics.',
      "In addition, we may use third party services such as Google Analytics that collect, monitor and analyze this.",
    ],
    callout:
      "The Log Data section is for businesses that use analytics or tracking services in websites or apps, like Google Analytics. For the full disclosure section, create your own Privacy Policy.",
  },
  {
    heading: "Communications",
    paragraphs: [
      "We may use your Personal Information to contact you with newsletters, marketing or promotional materials and other information that ...",
    ],
    callout:
      "The Communications section is for businesses that may contact users via email (email newsletters) or other methods. For the full disclosure section, create your own Privacy Policy.",
  },
  {
    heading: "Cookies",
    paragraphs: [
      "Cookies are files with small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer's hard drive.",
      'Like many sites, we use "cookies" to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.',
    ],
  },
  {
    heading: "Security",
    paragraphs: [
      "Cookies are files with small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer's hard drive.",
      'Like many sites, we use "cookies" to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.',
    ],
  },
  {
    heading: "Changes To This Privacy Policy",
    paragraphs: [
      "This Privacy Policy is effective as of (add date) and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.",
      "We reserve the right to update or change our Privacy Policy at any time and you should check this Privacy Policy periodically. Your continued use of the Service after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.",
      "If we make any material changes to this Privacy Policy, we will notify you either through the email address you have provided us, or by placing a prominent notice on our website.",
    ],
  },
  {
    heading: "Contact Us",
    paragraphs: ["If you have any questions about this Privacy Policy, please contact us."],
  },
];

export function PrivacyPolicyContent() {
  return (
    <>
      <Header />
      <main className="bg-dark-main">
        <PageHero title="Privacy Policy" backgroundImage="/images/heroes/legal-hero.png" />

        <section className="w-full bg-dark-main pb-16 pt-10 md:pb-20 md:pt-12">
          <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12 lg:px-0">
            <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
              <div className="min-w-0 flex-1 lg:max-w-[850px]">
                <div className="flex flex-col gap-8">
                  {sections.map((section) => (
                    <div key={section.heading} className="flex flex-col gap-6">
                      <h2 className="font-body text-2xl font-medium leading-8 text-white">
                        {section.heading}
                      </h2>
                      {section.paragraphs.map((p, i) => (
                        <p
                          key={`${section.heading}-p-${i}`}
                          className="font-body text-base leading-6 text-white"
                        >
                          {p}
                        </p>
                      ))}
                      {section.callout && (
                        <div
                          className="rounded-2xl px-6 py-4"
                          style={{ background: "rgba(56,56,82,0.3)" }}
                        >
                          <p className="font-body text-base leading-6 text-white">
                            {section.callout}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <aside className="flex w-full shrink-0 flex-col gap-12 lg:w-[315px]">
                <ContactMethods />
                <RatingCards />
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
