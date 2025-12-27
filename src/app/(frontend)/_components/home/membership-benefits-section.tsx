import Heading from '@/components/shared/heading';
import Container from '@/components/global/container';
import { Button } from '@/components/ui/button';
import { CheckCircle, Star, Gift, Users, Calendar, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

type BenefitItem = {
  _key: string;
  title?: string | null;
  description?: string | null;
  icon?: string | null;
};

type MembershipBenefitsSectionProps = {
  heading?: string | null;
  benefits?: BenefitItem[] | null;
  optionalCTA?: {
    label?: string | null;
    href?: {
      _type?: string | null;
      slug?: string | null;
      title?: string | null;
    } | null;
  } | null;
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  CheckCircle,
  Star,
  Gift,
  Users,
  Calendar,
  Award,
};

export default function MembershipBenefitsSection(props: MembershipBenefitsSectionProps) {
  const { heading, benefits, optionalCTA } = props;

  // Ne pas afficher si aucun contenu
  if (!heading && (!benefits || benefits.length === 0)) return null;

  return (
    <section className="px-4 xl:px-10">
      <Container className="px-4 py-16 md:py-28 border-x border-dashed">
        <div className="max-w-[60rem] mx-auto space-y-8 md:space-y-12">
          {heading && (
            <div className="text-center">
              <Heading tag="h2" size="xl" className="text-balance">
                {heading}
              </Heading>
            </div>
          )}
          {benefits && benefits.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {benefits.map((benefit) => {
                const IconComponent = benefit.icon ? iconMap[benefit.icon] || CheckCircle : CheckCircle;
                return (
                  <div
                    key={benefit._key}
                    className="border border-dashed rounded-3xl p-6 md:p-8 space-y-4"
                  >
                    {benefit.icon && (
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
                        <IconComponent className="w-6 h-6" style={{ color: '#0072bd' }} />
                      </div>
                    )}
                    {benefit.title && (
                      <Heading tag="h3" size="md" className="font-semibold">
                        {benefit.title}
                      </Heading>
                    )}
                    {benefit.description && (
                      <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          {optionalCTA?.label && optionalCTA?.href && (
            <div className="flex justify-center pt-4">
              <Button
                variant="primary"
                buttonType="internal"
                pageReference={{
                  _type: optionalCTA.href._type ?? 'page',
                  slug: optionalCTA.href.slug ?? '',
                  title: optionalCTA.href.title ?? '',
                  _id: ''
                } as any}
              >
                {optionalCTA.label}
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

