import { Metadata } from 'next';
import { processMetadata } from '@/lib/utils';
import EventGrid from './_components/event-grid';
import { sanityFetch } from '@/sanity/lib/live';
import { eventsPageQuery, allEventsQuery } from '@/sanity/lib/queries/documents/event';

type EventsPageData = {
  _id?: string | null;
  _type?: string | null;
  title?: string | null;
  subtitle?: string | null;
  pageBuilder?: Array<any> | null;
  events?: Array<any> | null;
  seo?: any;
} | null;

export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await sanityFetch({
    query: eventsPageQuery,
    stega: false
  }) as { data: EventsPageData };

  if (!page) { return {} };

  return processMetadata({ data: page as any });
}

export default async function EventsPage() {
  const { data: page } = await sanityFetch({
    query: eventsPageQuery,
  }) as { data: EventsPageData };

  // Si eventsPage n'existe pas, récupérer les événements directement
  let events = (page as EventsPageData)?.events ?? [];
  
  if (!page || events.length === 0) {
    const { data: allEvents } = await sanityFetch({
      query: allEventsQuery,
    });
    events = allEvents ?? [];
  }

  return (
    <EventGrid events={events} />
  );
}

