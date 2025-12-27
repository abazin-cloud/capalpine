import Link from 'next/link';
import Container from './container';
import Heading from '../shared/heading';
import SiteLogo from '../shared/site-logo';
import AnimatedUnderline from '../shared/animated-underline';
import { GeneralSettingsQueryResult } from '../../../sanity.types';
import { resolveHref } from '@/lib/utils';

interface FooterProps {
  settings: GeneralSettingsQueryResult;
  pages: Array<{
    _id: string;
    _type: string;
    title: string | null;
    slug: string | null;
  }>;
}

export default function Footer({ settings, pages }: FooterProps) {

  const { copyright } = settings ?? {};

  return (
    <footer className='px-4 xl:px-10 border-t border-t-gray-200/60'>
      <Container className='pt-14 md:pt-16 border-x border-dashed'>
        <div className='w-full space-y-14 md:space-y-16'>
          <div className='flex-none py-4 md:py-0 border-y border-dashed md:border-none'>
            <SiteLogo settings={settings} location="footer" />
          </div>
          {pages && pages.length > 0 && (
            <div className='border-y border-dashed pattern-bg--2'>
              <div className='py-8 md:py-10 px-4'>
                <Heading tag="h2" size="sm" className='mb-6 font-semibold'>
                  Pages du site
                </Heading>
                <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
                  {pages.map((page) => (
                    <li key={page._id}>
                      <Link 
                        href={resolveHref(page._type ?? 'page', page.slug ?? '') ?? '/'}
                        className='relative group text-sm md:text-base'
                      >
                        {page.title}
                        <AnimatedUnderline />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className='relative mt-10 md:mt-20 mb-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-0 border-y border-dashed text-xs pattern-bg--2'>
          <div className='z-20 relative'>
            {copyright ? copyright : 'Cap Alpine'} © {new Date().getFullYear()}
          </div>
          <EdgeBlur />
        </div>
      </Container>
    </footer>
  )
}


function EdgeBlur() {
  return (
    <div className='absolute inset-0 flex items-center justify-between'>
      <div className='relative bg-gradient-to-r from-white to-transparent h-full w-[100px]'></div>
      <div className='bg-gradient-to-l from-white to-transparent h-full w-[100px]'></div>
    </div>
  )
}