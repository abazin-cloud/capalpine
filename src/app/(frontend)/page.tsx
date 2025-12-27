import { Metadata } from "next";
import { processMetadata } from "@/lib/utils";
import { sanityFetch } from "@/sanity/lib/live";
import Container from "@/components/global/container";
import HeroSection from "./_components/home/hero-section";
import SpiritSection from "./_components/home/spirit-section";
import MembershipBenefitsSection from "./_components/home/membership-benefits-section";
import PartnersSection from "./_components/home/partners-section";
import EventsSection from "./_components/home/events-section";
import FinalCTASection from "./_components/home/final-cta-section";
import { homePageQuery, homePageEventsQuery } from "@/sanity/lib/queries/singletons/home-page";

export async function generateMetadata(): Promise<Metadata> {
  const { data: homePage } = await sanityFetch({
    query: homePageQuery,
    stega: false,
  });

  if (!homePage) { return {} };

  return processMetadata({ 
    data: {
      _type: 'homePage',
      title: homePage.hero?.title || 'Cap Alpine',
      seo: homePage.seo
    } as any 
  });
}

export default async function Home() {
  // Récupérer la page d'accueil et les événements
  const [{ data: homePage }, { data: events }] = await Promise.all([
    sanityFetch({ query: homePageQuery }),
    sanityFetch({ query: homePageEventsQuery }),
  ]);

  // Fallback si la page n'existe pas encore
  if (!homePage) {
    return (
      <Container className="py-16">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-2xl font-semibold">Page d'accueil non configurée</h1>
          <p className="text-neutral-600">
            Veuillez créer le document "Page d'accueil" dans Sanity Studio pour afficher le contenu.
          </p>
        </div>
      </Container>
    );
  }

  return (
    <div id="home">
      {/* Hero Section */}
      {homePage.hero && (
        <HeroSection {...homePage.hero} />
      )}

      {/* Spirit Section */}
      {homePage.spirit && (
        <SpiritSection {...homePage.spirit} />
      )}

      {/* Membership Benefits Section */}
      {homePage.membershipBenefits && (
        <MembershipBenefitsSection {...homePage.membershipBenefits} />
      )}

      {/* Partners Section */}
      {homePage.partners && homePage.partners.partnersList && homePage.partners.partnersList.length > 0 && (
        <PartnersSection {...homePage.partners} />
      )}

      {/* Events Section */}
      {homePage.events && events && events.length > 0 && (
        <EventsSection {...homePage.events} events={events} />
      )}

      {/* Final CTA Section */}
      {homePage.finalCTA && (
        <FinalCTASection {...homePage.finalCTA} />
      )}
    </div>
  );
}