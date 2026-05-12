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
    heading: "Termination",
    paragraphs: [
      "We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.",
      "All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.",
    ],
  },
  {
    heading: "Subscriptions",
    paragraphs: [
      'Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring basis.',
    ],
    callout:
      'The Subscriptions section is for SaaS businesses. For the full disclosure section or for a "Purchases" section, create your own Terms of Service.',
  },
  {
    heading: "Content",
    paragraphs: [
      'Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the ...',
    ],
    callout:
      "The Content section is for businesses that allow users to create, edit, share, make content on their websites or apps. For the full disclosure section, create your own Terms of Service.",
  },
  {
    heading: "Links To Other Web Sites",
    paragraphs: [
      "Our Service may contain links to third-party web sites or services that are not owned or controlled by OGEdge.",
      "OGEdge has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that OGEdge shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.",
    ],
  },
  {
    heading: "Security",
    paragraphs: [
      "The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.",
    ],
  },
  {
    heading: "Changes",
    paragraphs: [
      "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.",
    ],
  },
  {
    heading: "Contact Us",
    paragraphs: ["If you have any questions about these Terms of Service, please contact us."],
  },
];

export function TermsOfServiceContent() {
  return (
    <>
      <Header />
      <main className="bg-dark-main">
        <PageHero title="Terms of Service" backgroundImage="/images/heroes/legal-hero.png" />

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
