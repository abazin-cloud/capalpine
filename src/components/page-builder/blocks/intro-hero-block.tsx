"use client"
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Heading from '@/components/shared/heading';
import Container from '@/components/global/container';
import ButtonRenderer from '@/components/shared/button-renderer';
import { stegaClean } from 'next-sanity';

export type IntroHeroBlockProps = {
  _id: string | null;
  _key: string;
  _type: "introHeroBlock";
  heading?: string | null;
  introText?: string | null;
  buttons?: Array<any> | null;
  heroImage?: {
    height?: "small" | "medium" | "large" | null;
    asset?: {
      _ref: string | null;
      _type: string | null;
      url: string | null;
      altText?: string | null;
      description?: string | null;
      tags?: Array<string> | null;
      title?: string | null;
    } | null;
    altText?: string | null;
  } | null;
  anchorId?: string | null;
};

export default function IntroHeroBlock(props: IntroHeroBlockProps) {
  const { 
    heading, 
    introText,
    buttons,
    heroImage,
    anchorId 
  } = props;

  const imageHeight = stegaClean(heroImage?.height) ?? 'medium';
  const heightClasses = {
    small: 'h-[400px]',
    medium: 'h-[500px] md:h-[500px]',
    large: 'h-[600px] md:h-[600px] lg:h-[600px]',
  };

  // Filter buttons that should be shown and have valid configuration
  const visibleButtons = buttons?.filter((btn: any) => {
    const showButton = stegaClean(btn?.showButton);
    const buttonType = stegaClean(btn?.buttonType);
    const buttonText = btn?.buttonText;
    
    // Button must be set to show and have text
    if (showButton === false || !buttonText) return false;
    
    // For internal buttons, must have a page reference
    if (buttonType === 'internal') {
      const pageRef = stegaClean(btn?.buttonPageReference);
      if (!pageRef) {
        console.warn(`Button "${buttonText}" is set to internal but has no page reference`);
        return false;
      }
    }
    
    return true;
  }) ?? [];

  return (
    <>
      {/* Introduction Section */}
      <section 
        {...(anchorId ? { id: anchorId } : {})}
        className="px-4 xl:px-10 pattern-bg"
      >
        <Container className="px-4 pt-40 md:pt-48 pb-14 md:pb-20 border-x border-dashed">
          <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8">
            {heading && (
              <Heading tag="h1" size="xxxl" className="text-balance">
                {heading}
              </Heading>
            )}
            {introText && (
              <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                {introText}
              </p>
            )}
            {visibleButtons.length > 0 ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <ButtonRenderer buttons={visibleButtons} />
              </div>
            ) : buttons && buttons.length > 0 && (
              <div className="pt-4 text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="font-medium mb-1">⚠️ Les boutons ne peuvent pas être affichés</p>
                <p className="text-xs">Vérifiez dans Sanity Studio que chaque bouton avec le type "Internal" a bien une référence de page définie (Button Page Reference).</p>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Hero Banner Image */}
      {heroImage?.asset?.url && (
        <section className="px-4 xl:px-10">
          <Container className="px-4 border-x border-dashed">
            <div className={cn(
              "relative w-full rounded-3xl overflow-hidden border border-dashed",
              heightClasses[imageHeight as keyof typeof heightClasses] || heightClasses.medium
            )}>
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
    </>
  )
}

