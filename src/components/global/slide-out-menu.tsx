import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import SiteLogo from "../shared/site-logo";
import { useRouter } from "next/navigation";
import { cn, resolveHref } from "@/lib/utils";
import AnimatedUnderline from "../shared/animated-underline";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { GeneralSettingsQueryResult, NavigationSettingsQueryResult } from "../../../sanity.types";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';

export default function SlideOutMenu({ children, settings, navigationSettings }: {
  children: React.ReactNode;
  settings: GeneralSettingsQueryResult;
  navigationSettings: NavigationSettingsQueryResult;
}) {

  const router = useRouter();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const { 
    slideOutMenuItems: menuItems
  } = navigationSettings?.slideOutMenu ?? {};

  return(
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className='overflow-y-scroll pb-44'>
        <SheetHeader className='z-20 fixed top-0 pt-[26px] right-7 w-[338px] md:w-[330px] h-20 border-b border-dashed border-b-gray-200 bg-white/95'>
          <SiteLogo settings={settings} theme='dark' />
        </SheetHeader>
        <SheetTitle className='mt-16 px-0 py-6 antialiased font-normal text-gray-400'>
          Explore
        </SheetTitle>
        <ul className='px-0 flex flex-col gap-4 text-black'>
          {menuItems?.map((item) => {
            return (
              <React.Fragment key={item?._key}>
                {item.menuItemType === 'group' ? (
                  <Collapsible 
                    open={openItems[item._key]}
                    onOpenChange={(open) => (
                      setOpenItems(prev => ({ ...prev, [item._key]: open }))
                    )}
                    className="space-y-3.5"
                  >
                    <CollapsibleTrigger className="relative flex items-center gap-2 text-3xl tracking-tight group">
                      <span className="relative">
                        {item.title} 
                        <AnimatedUnderline className='h-[2px]' />
                      </span>
                      <ChevronDown 
                        size={23} 
                        className={cn('translate-y-0.5 rotate-0 transition-transform duration-200', {
                          'rotate-180': openItems[item._key]
                        })}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="flex flex-col gap-y-1 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 transition-all duration-200">
                      {item?.pageReferences?.map((item) => (
                        <SheetClose key={item.title} asChild>
                          <div 
                            onClick={() => {
                              router.push(resolveHref(item._type ?? '', item.slug ?? '') ?? '/');
                              setOpenItems(prev => ({ ...prev, [item.title ?? '']: false }));
                            }}
                            className='relative block text-xl tracking-tight text-gray-500 hover:text-black group cursor-pointer'
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                router.push(resolveHref(item._type ?? '', item.slug ?? '') ?? '/');
                                setOpenItems(prev => ({ ...prev, [item.title ?? '']: false }));
                              }
                            }}
                          >
                            {item.title}
                            <AnimatedUnderline className='h-[1.5px] bg-gray-500 group-hover:bg-black' />
                          </div>
                        </SheetClose>
                      ))}                        
                    </CollapsibleContent>
                  </Collapsible>
                ): (
                  <SheetClose asChild>
                    <div 
                      onClick={() => (
                        router.push(resolveHref(item.pageReference?._type ?? '', item.pageReference?.slug ?? '') ?? '/')
                      )}
                      className='relative block text-3xl tracking-tight group cursor-pointer'
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          router.push(resolveHref(item.pageReference?._type ?? '', item.pageReference?.slug ?? '') ?? '/');
                        }
                      }}
                    >
                      {item.title}
                      <AnimatedUnderline className='h-[2px]' />
                    </div>
                  </SheetClose>
                )}
              </React.Fragment>
            )
          })}
        </ul>
      </SheetContent>
    </Sheet>
  )
}