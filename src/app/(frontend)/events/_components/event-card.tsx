import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, MapPin, Calendar } from 'lucide-react';
import Heading from '@/components/shared/heading';
import AnimatedUnderline from '@/components/shared/animated-underline';

interface EventCardProps {
  event: {
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
  };
}

export default function EventCard({ event }: EventCardProps) {
  const { title, slug, excerpt, startDate, location, image } = event;

  const formatDate = (date: string | null | undefined) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article aria-label={title ?? ''} className='relative group'>
      <Link href={`/events/${slug}`} className='relative'>
        <Thumbnail image={image} />
        <Heading tag="h2" size="md" className='mt-5 md:mt-6 text-balance'>
          {title}   
        </Heading>
        {excerpt && (
          <Excerpt>
            {excerpt}
          </Excerpt>
        )}
        <div className='mt-5 md:mt-6 flex items-center justify-between'>
          <div className='flex items-center gap-3.5 text-sm text-neutral-600'>
            {startDate && (
              <div className='flex items-center gap-1.5'>
                <Calendar size={14} />
                <span>{formatDate(startDate)}</span>
              </div>
            )}
            {location?.name && (
              <div className='flex items-center gap-1.5'>
                <MapPin size={14} />
                <span>{location.name}</span>
              </div>
            )}
          </div>
          <ChevronRight 
            size={18} 
            className='-translate-x-6 opacity-0 group-hover:-translate-x-0 group-hover:opacity-100 transition-all duration-300 text-gray-600'
          />
        </div>
      </Link>
      <AnimatedUnderline className='-translate-y-0.5' />
    </article>
  )
}

function Thumbnail({ image }: {
  image?: {
    asset?: { url?: string | null } | null;
    altText?: string | null;
  } | null;
}) {
  
  if (!image?.asset?.url) return null;
  
  return (
    <div className='p-4 rounded-3xl border border-dashed backdrop-blur-md backdrop-opacity-50 pattern-bg--2'>
      <Image
        src={image.asset.url}
        width={800}
        height={800}
        alt={image.altText ?? ''}
        className='aspect-[3/2] rounded-2xl'
      />
    </div>
  )
}

function Excerpt({ children }: { children: React.ReactNode }) {
  return (
    <p className='mt-4 text-balance text-neutral-500'>
      {children}
    </p>
  )
}

