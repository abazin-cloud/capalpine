import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Heading from '@/components/shared/heading';
import Container from '@/components/global/container';

type HeroSectionProps = {
  title?: string | null;
  description?: string | null;
  primaryCTA?: {
    label?: string | null;
    href?: {
      _type?: string | null;
      slug?: string | null;
      title?: string | null;
    } | null;
  } | null;
  secondaryCTA?: {
    label?: string | null;
    href?: {
      _type?: string | null;
      slug?: string | null;
      title?: string | null;
    } | null;
  } | null;
  heroImage?: {
    asset?: { url?: string | null } | null;
    altText?: string | null;
  } | null;
};

export default function HeroSection(props: HeroSectionProps) {
  const { title, description, primaryCTA, secondaryCTA, heroImage } = props;

  // Ne pas afficher si aucun contenu
  if (!title && !description) return null;

  return (
    <section className="px-4 xl:px-10 pattern-bg">
      <Container className="px-4 pt-44 md:pt-48 pb-14 md:pb-20 border-x border-dashed">
        <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8">
          {title && (
            <Heading 
              tag="h1" 
              size="xxxl" 
              className="break-words md:whitespace-nowrap"
            >
              {title}
            </Heading>
          )}
          {description && (
            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>
          )}
          {(primaryCTA || secondaryCTA) && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              {primaryCTA?.label && primaryCTA?.href && (
                <Button
                  variant="primary"
                  buttonType="internal"
                  pageReference={{
                    _type: primaryCTA.href._type ?? 'page',
                    slug: primaryCTA.href.slug ?? '',
                    title: primaryCTA.href.title ?? '',
                    _id: ''
                  } as any}
                >
                  {primaryCTA.label}
                </Button>
              )}
              {secondaryCTA?.label && secondaryCTA?.href && (
                <Button
                  variant="secondary"
                  buttonType="internal"
                  pageReference={{
                    _type: secondaryCTA.href._type ?? 'page',
                    slug: secondaryCTA.href.slug ?? '',
                    title: secondaryCTA.href.title ?? '',
                    _id: ''
                  } as any}
                >
                  {secondaryCTA.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>
      {heroImage?.asset?.url && (
        <section className="px-4 xl:px-10">
          <Container className="px-4 border-x border-dashed">
            <div className="relative w-full h-[500px] md:h-[500px] rounded-3xl overflow-hidden border border-dashed">
              <Image
                src={heroImage.asset.url}
                alt={heroImage.altText ?? 'Cap Alpine - Association de montagne'}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              />
            </div>
          </Container>
        </section>
      )}
    </section>
  );
}

