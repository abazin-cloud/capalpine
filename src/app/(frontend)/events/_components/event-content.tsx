"use client"
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Calendar, Users, Clock } from 'lucide-react';
import Heading from '@/components/shared/heading';
import BackButton from '@/components/shared/back-button';
import PortableTextEditor from '@/components/portable-text/portable-text-editor';
import Container from '@/components/global/container';

interface EventContentProps {
  event: {
    _id: string;
    title: string | null;
    slug: string | null;
    excerpt: string | null;
    startDate: string | null;
    endDate: string | null;
    location?: {
      name: string | null;
      address: string | null;
    } | null;
    capacity: number | null;
    registrationOpen: boolean | null;
    registrationButtonText: string | null;
    closedButtonText: string | null;
    content?: any[] | null;
    image?: {
      asset?: { url?: string | null } | null;
      altText?: string | null;
      caption?: string | null;
    } | null;
  };
}

export default function EventContent({ event }: EventContentProps) {
  const { 
    title, 
    startDate,
    endDate,
    location,
    capacity,
    registrationOpen,
    registrationButtonText,
    closedButtonText,
    content, 
    excerpt, 
    image
  } = event;

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

  const formatTime = (date: string | null | undefined) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Container className="py-16">
      <div className='order-0 grid grid-cols-12 gap-y-10 xl:gap-20'>
        <aside className='col-span-12 xl:col-span-2 xl:sticky xl:top-28 h-fit -translate-x-1 md:-translate-x-0'>
          <BackButton />
        </aside>
        <div className='order-2 xl:order-1 col-span-12 xl:col-span-7 xl:pl-10 xl:border-l xl:border-dashed'>
          <Heading tag="h1" size="xxl" className='mt-8'>
            {title}
          </Heading>
          
          <div className='mt-8 space-y-4'>
            {startDate && (
              <InfoRow icon={<Calendar size={20} />}>
                <div>
                  <div className="font-medium">{formatDate(startDate)}</div>
                  <div className="text-sm text-neutral-600">
                    {formatTime(startDate)}
                    {endDate && ` - ${formatTime(endDate)}`}
                  </div>
                </div>
              </InfoRow>
            )}
            
            {location?.name && (
              <InfoRow icon={<MapPin size={20} />}>
                <div>
                  <div className="font-medium">{location.name}</div>
                  {location.address && (
                    <div className="text-sm text-neutral-600">{location.address}</div>
                  )}
                </div>
              </InfoRow>
            )}
            
            {capacity && (
              <InfoRow icon={<Users size={20} />}>
                <div className="font-medium">
                  {capacity} {capacity === 1 ? 'place' : 'places'}
                </div>
              </InfoRow>
            )}
          </div>

          <div className='mt-8'>
            <StatusButton 
              isOpen={registrationOpen ?? false}
              openText={registrationButtonText || "S'inscrire"}
              closedText={closedButtonText || "Inscriptions fermées"}
            />
          </div>

          {excerpt && (
            <p className='text-lg xl:text-xl my-10 xl:my-14 py-8 border-y border-dashed'>
              {excerpt}
            </p>
          )}

          <Thumbnail image={image} />

          {content && content.length > 0 && (
            <div className='mt-10'>
              <PortableTextEditor data={content} />
            </div>
          )}
        </div>
        <aside className='hidden xl:block order-1 xl:order-2 col-span-12 xl:col-span-3 xl:sticky xl:top-28 h-fit'>
          {/* Sidebar content can be added here if needed */}
        </aside>
      </div>
    </Container>
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
    <>
      <div className='mt-10 p-4 rounded-3xl border border-dashed backdrop-blur-md backdrop-opacity-50'>
        <Image
          src={image.asset.url}
          width={800}
          height={800}
          alt={image.altText ?? ''}
          className='aspect-[3/2] w-full rounded-2xl object-cover'
        />
      </div>
      {image.altText && (
        <div className='flex items-center justify-center gap-1 mt-4 text-center text-gray-600'>
          {image.altText}
        </div>
      )}
    </>
  )
}

function InfoRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className='flex items-start gap-4'>
      <span className='text-neutral-400 mt-0.5'>{icon}</span>
      <div>{children}</div>
    </div>
  )
}

function StatusButton({ 
  isOpen, 
  openText, 
  closedText 
}: { 
  isOpen: boolean; 
  openText: string; 
  closedText: string;
}) {
  return (
    <span className={`inline-flex items-center px-4 py-2 rounded-md text-base font-medium ${
      isOpen 
        ? 'bg-green-100 text-green-800' 
        : 'bg-pink-100 text-pink-800'
    }`}>
      {isOpen ? openText : closedText}
    </span>
  )
}

