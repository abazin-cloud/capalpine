import Heading from '@/components/shared/heading';
import Container from '@/components/global/container';
import { Heart, Users, Sparkles, Mountain, Route, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

type ValueItem = {
  _key: string;
  title?: string | null;
  description?: string | null;
  icon?: string | null;
};

type SpiritSectionProps = {
  heading?: string | null;
  body?: string | null;
  values?: ValueItem[] | null;
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  Users,
  Sparkles,
  Mountain,
  Route,
  Trophy,
};

export default function SpiritSection(props: SpiritSectionProps) {
  const { heading, body, values } = props;

  // Ne pas afficher si aucun contenu
  if (!heading && !body && (!values || values.length === 0)) return null;

  return (
    <section className="px-4 xl:px-10">
      <Container className="px-4 py-16 md:py-28 border-x border-dashed">
        <div className="max-w-[60rem] mx-auto space-y-8 md:space-y-12">
          {(heading || body) && (
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              {heading && (
                <Heading tag="h2" size="xl" className="text-balance">
                  {heading}
                </Heading>
              )}
              {body && (
                <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
                  {body}
                </p>
              )}
            </div>
          )}
          {values && values.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {values.map((value) => {
                const IconComponent = value.icon ? iconMap[value.icon] || Heart : Heart;
                return (
                  <div
                    key={value._key}
                    className="border border-dashed rounded-3xl p-6 md:p-8 space-y-4"
                  >
                    {value.icon && (
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
                        <IconComponent className="w-6 h-6" style={{ color: '#0072bd' }} />
                      </div>
                    )}
                    {value.title && (
                      <Heading tag="h3" size="md" className="font-semibold">
                        {value.title}
                      </Heading>
                    )}
                    {value.description && (
                      <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
                        {value.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

