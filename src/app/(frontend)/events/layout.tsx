import React from 'react';
import { sanityFetch } from '@/sanity/lib/live';
import EventsLayout from './_components/events-layout';
import { eventsPageQuery, allEventsQuery } from '@/sanity/lib/queries/documents/event';

type EventsPageData = {
  _id?: string | null;
  _type?: string | null;
  title?: string | null;
  subtitle?: string | null;
  pageBuilder?: Array<any> | null;
  events?: Array<any> | null;
} | null;

export default async function EventsArchiveLayout({ children }: {
  children: React.ReactNode;
}) {
  
  const { data: page } = await sanityFetch({
    query: eventsPageQuery,
  }) as { data: EventsPageData };

  // Si eventsPage n'existe pas, récupérer les événements directement pour la toolbar
  let events = (page as EventsPageData)?.events ?? [];
  if (!page || events.length === 0) {
    const { data: allEvents } = await sanityFetch({
      query: allEventsQuery,
    });
    events = allEvents ?? [];
  }

  // Créer un objet page avec les événements même si eventsPage n'existe pas
  const pageWithEvents: EventsPageData = page || {
    title: 'Nos événements',
    subtitle: 'Découvrez nos prochains événements',
    events: events
  };

  return (
    <EventsLayout page={pageWithEvents}>
      {children}
    </EventsLayout>
  )
}

