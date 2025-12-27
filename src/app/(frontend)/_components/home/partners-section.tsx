import Image from 'next/image';
import Link from 'next/link';
import Heading from '@/components/shared/heading';
import Container from '@/components/global/container';
import { cn } from '@/lib/utils';

type Partner = {
  _key: string;
  name?: string | null;
  logo?: {
    asset?: { url?: string | null } | null;
    altText?: string | null;
  } | null;
  href?: string | null;
  tier?: string | null;
};

type PartnersSectionProps = {
  heading?: string | null;
  intro?: string | null;
  partnersList?: Partner[] | null;
};

export default function PartnersSection(props: PartnersSectionProps) {
  const { heading, intro, partnersList } = props;

  // Ne pas afficher si aucun contenu
  if (!heading && (!partnersList || partnersList.length === 0)) return null;

  // Grouper les partenaires par tier
  const groupedPartners = partnersList?.reduce((acc, partner) => {
    const tier = partner.tier || 'secondary';
    if (!acc[tier]) acc[tier] = [];
    acc[tier].push(partner);
    return acc;
  }, {} as Record<string, Partner[]>) || {};

  return (
    <section className="px-4 xl:px-10">
      <Container className="px-4 py-16 md:py-28 border-x border-dashed">
        <div className="max-w-[60rem] mx-auto space-y-8 md:space-y-12">
          {(heading || intro) && (
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              {heading && (
                <Heading tag="h2" size="xl" className="text-balance">
                  {heading}
                </Heading>
              )}
              {intro && (
                <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
                  {intro}
                </p>
              )}
            </div>
          )}
          {partnersList && partnersList.length > 0 && (
            <div className="space-y-12">
              {/* Partenaires principaux */}
              {groupedPartners.primary && groupedPartners.primary.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-center text-sm font-semibold text-neutral-500 uppercase tracking-wider">
                    Partenaires principaux
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {groupedPartners.primary.map((partner) => (
                      <PartnerCard key={partner._key} partner={partner} />
                    ))}
                  </div>
                </div>
              )}
              {/* Partenaires secondaires */}
              {groupedPartners.secondary && groupedPartners.secondary.length > 0 && (
                <div className="space-y-6">
                  {groupedPartners.primary && groupedPartners.primary.length > 0 && (
                    <h3 className="text-center text-sm font-semibold text-neutral-500 uppercase tracking-wider">
                      Partenaires
                    </h3>
                  )}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {groupedPartners.secondary.map((partner) => (
                      <PartnerCard key={partner._key} partner={partner} />
                    ))}
                  </div>
                </div>
              )}
              {/* Supporters */}
              {groupedPartners.supporter && groupedPartners.supporter.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-center text-sm font-semibold text-neutral-500 uppercase tracking-wider">
                    Supporters
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {groupedPartners.supporter.map((partner) => (
                      <PartnerCard key={partner._key} partner={partner} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

function PartnerCard({ partner }: { partner: Partner }) {
  const content = (
    <div className="border border-dashed rounded-2xl p-6 flex items-center justify-center h-32 hover:bg-gray-50 transition-colors">
      {partner.logo?.asset?.url ? (
        <Image
          src={partner.logo.asset.url}
          alt={partner.logo.altText || partner.name || 'Logo partenaire'}
          width={120}
          height={80}
          className="object-contain max-h-16 w-auto"
        />
      ) : (
        <span className="text-sm text-neutral-400">{partner.name || 'Partenaire'}</span>
      )}
    </div>
  );

  if (partner.href) {
    return (
      <Link href={partner.href} target="_blank" rel="noopener noreferrer">
        {content}
      </Link>
    );
  }

  return content;
}

