import Heading from '@/components/shared/heading';
import Container from '@/components/global/container';
import { Button } from '@/components/ui/button';

type FinalCTASectionProps = {
  heading?: string | null;
  description?: string | null;
  button?: {
    label?: string | null;
    href?: {
      _type?: string | null;
      slug?: string | null;
      title?: string | null;
    } | null;
  } | null;
};

export default function FinalCTASection(props: FinalCTASectionProps) {
  const { heading, description, button } = props;

  // Ne pas afficher si aucun contenu
  if (!heading && !description && !button?.label) return null;

  return (
    <section className="px-4 xl:px-10">
      <Container className="px-4 py-16 md:py-28 border-x border-dashed">
        <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8">
          {heading && (
            <Heading tag="h2" size="xl" className="text-balance">
              {heading}
            </Heading>
          )}
          {description && (
            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
              {description}
            </p>
          )}
          {button?.label && button?.href && (
            <div className="pt-4">
              <Button
                variant="primary"
                buttonType="internal"
                pageReference={{
                  _type: button.href._type ?? 'page',
                  slug: button.href.slug ?? '',
                  title: button.href.title ?? '',
                  _id: ''
                } as any}
              >
                {button.label}
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

