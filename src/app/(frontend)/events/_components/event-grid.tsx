import React from 'react';
import EventCard from './event-card';

interface EventGridProps {
  events: Array<{
    _id: string;
    title: string | null;
    slug: string | null;
    excerpt: string | null;
    startDate: string | null;
    location?: {
      name: string | null;
      address: string | null;
    } | null;
    image?: {
      asset?: { url?: string | null } | null;
      altText?: string | null;
    } | null;
  }>;
}

export default function EventGrid({ events }: EventGridProps) {
  if (!events || events.length === 0) {
    return (
      <p className="text-center text-neutral-500">
        Aucun événement disponible pour le moment.
      </p>
    );
  }

  return (
    <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6'>
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}

