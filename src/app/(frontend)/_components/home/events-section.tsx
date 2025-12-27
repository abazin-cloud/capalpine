import Image from 'next/image';
import Link from 'next/link';
import Heading from '@/components/shared/heading';
import Container from '@/components/global/container';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin } from 'lucide-react';
// Format date helper
function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

type Event = {
  _id: string;
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  location?: {
    name?: string | null;
    address?: string | null;
  } | null;
  image?: {
    asset?: { url?: string | null } | null;
    altText?: string | null;
    caption?: string | null;
  } | null;
  registrationOpen?: boolean | null;
};

type EventsSectionProps = {
  heading?: string | null;
  intro?: string | null;
  ctaLabel?: string | null;
  events?: Event[] | null;
};

export default function EventsSection(props: EventsSectionProps) {
  const { heading, intro, ctaLabel, events } = props;

  // Ne pas afficher si aucun contenu
  if (!heading && (!events || events.length === 0)) return null;

  // Limiter à 3 événements
  const displayedEvents = events?.slice(0, 3) || [];

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
          {displayedEvents.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {displayedEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
          {ctaLabel && (
            <div className="flex justify-center pt-4">
              <Button
                variant="secondary"
                buttonType="internal"
                pageReference={{
                  _type: 'eventsPage',
                  slug: 'events',
                  title: 'Nos événements',
                  _id: ''
                } as any}
              >
                {ctaLabel}
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

function EventCard({ event }: { event: Event }) {
  const eventUrl = event.slug ? `/events/${event.slug}` : '#';
  const isUpcoming = event.startDate ? new Date(event.startDate) > new Date() : false;

  return (
    <Link href={eventUrl} className="group h-full flex">
      <div className="border border-dashed rounded-3xl overflow-hidden hover:bg-gray-50 transition-colors flex flex-col h-full w-full">
        <div className="relative w-full h-48 overflow-hidden flex-shrink-0">
          {event.image?.asset?.url ? (
            <Image
              src={event.image.asset.url}
              alt={event.image.altText || event.title || 'Événement'}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Pas d'image</span>
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col flex-grow">
          {event.title && (
            <div className="mb-4 flex-shrink-0 h-[4rem] flex items-start">
              <Heading tag="h3" size="md" className="font-semibold transition-colors group-hover:opacity-80" style={{ color: event.title ? undefined : '#0072bd' }}>
                {event.title}
              </Heading>
            </div>
          )}
          {event.excerpt && (
            <p 
              className="text-sm text-neutral-600 min-h-[4rem] flex-shrink-0 py-3 mt-2 md:mt-4 mb-4"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: '1.5rem',
                maxHeight: '3rem',
              }}
            >
              {event.excerpt}
            </p>
          )}
          <div className="space-y-3 text-sm text-neutral-600 mt-auto flex-shrink-0 pt-2">
            {event.startDate && (
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 flex-shrink-0" style={{ color: '#0072bd' }} />
                <span className="text-neutral-600">{formatDate(event.startDate)}</span>
              </div>
            )}
            {event.location?.name && (
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: '#0072bd' }} />
                <span className="text-neutral-600">{event.location.name}</span>
              </div>
            )}
          </div>
          {isUpcoming && event.registrationOpen && (
            <div className="pt-2">
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: '#0072bd', color: '#ffffff' }}>
                Inscriptions ouvertes
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

