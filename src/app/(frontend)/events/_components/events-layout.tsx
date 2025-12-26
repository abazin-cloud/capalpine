"use client"
import React from 'react';
import EventsToolbar from './events-toolbar';
import { usePathname } from 'next/navigation';
import Heading from '@/components/shared/heading';
import Container from '@/components/global/container';
import { PageBuilder } from '@/components/page-builder';
export default function EventsLayout({ children, page }: Readonly<{
  children: React.ReactNode;
  page: {
    _id?: string | null;
    _type?: string | null;
    title?: string | null;
    subtitle?: string | null;
    pageBuilder?: Array<any> | null;
    events?: Array<any> | null;
  } | null;
}>) {

  const pathname = usePathname();

  const { events, title, subtitle } = page ?? {};

  if (pathname === '/events') return (
    <main className='overflow-hidden md:overflow-auto'>
      <div className='px-4 xl:px-10 pattern-bg'>
        <Container className='px-4 pt-40 md:pt-48 pb-14 md:pb-28 border-x border-dashed'>
          <Heading tag="h1" size="xxxl" className='w-fit'>
            {title || 'Nos événements'}
          </Heading>
          {subtitle && (
            <p className='mt-4 text-lg text-neutral-600'>
              {subtitle}
            </p>
          )}
          {pathname === '/events' && (
            <EventsToolbar events={events ?? undefined} />
          )}
          {children}
        </Container>
      </div>
      {page?._id && page?.pageBuilder && page.pageBuilder.length > 0 && (
        <PageBuilder
          id={page._id}
          type={page._type ?? 'eventsPage'}
          pageBuilder={page.pageBuilder}
        />
      )}
    </main>
  )

  return (
    <main className='pt-32 md:pt-40 pb-10 xl:pb-16 pattern-bg'>
      <Container>
        {children}
      </Container>
    </main>
  )
}

