import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { processMetadata } from '@/lib/utils';
import { sanityFetch } from '@/sanity/lib/live';
import EventContent from '../_components/event-content';
import { eventBySlugQuery, eventSlugsQuery } from '@/sanity/lib/queries/documents/event';
import { EventBySlugQueryResult } from '../../../../../sanity.types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: eventSlugsQuery,
    perspective: "published",
    stega: false,
  });
  return data ?? [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { data: event } = await sanityFetch({
    query: eventBySlugQuery,
    params: await params,
    stega: false,
  });

  if (!event) { return {} };

  return processMetadata({ data: event as EventBySlugQueryResult });
}

export default async function EventPage({ params }: PageProps) {
  const { data: event } = await sanityFetch({ 
    query: eventBySlugQuery, 
    params: await params
  });

  if (event === null) notFound();

  return (
    <EventContent event={event} />
  )
}

