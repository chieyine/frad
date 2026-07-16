'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Stamp from '@/components/ui/Stamp';
import { trackCarouselSlide } from '@/lib/analytics';
import { FEATURED_MEDIA } from '@/lib/media';

export interface CarouselSlide {
  id?: string;
  title: string;
  image: string;
  caption?: string;
  category?: string;
  location?: string;
  alt?: string;
}

interface ImageCarouselProps {
  slides?: CarouselSlide[];
  title?: string;
  eyebrow?: string;
  wordpressKey?: string;
}

export default function ImageCarousel({
  slides,
  title = 'Our programmes in action',
  eyebrow = 'From the field',
  wordpressKey,
}: ImageCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const defaultSlides: CarouselSlide[] = useMemo(() => FEATURED_MEDIA.map((m, idx) => {
    const raw = m as Record<string, unknown>;
    return {
      id: `media-${idx}`,
      title: m.title,
      image: m.image,
      caption: m.caption,
      category: (raw.category as string) || (raw.type as string) || 'Field Intervention',
      location: m.location,
      alt: (raw.alt as string) || m.title,
    };
  }), []);

  const activeSlides = useMemo(
    () => slides && slides.length > 0 ? slides : defaultSlides,
    [slides, defaultSlides]
  );

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const handleScroll = () => {
      const scrollLeft = scroller.scrollLeft;
      const width = scroller.clientWidth;
      if (width > 0) {
        const newIndex = Math.round(scrollLeft / width);
        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < activeSlides.length) {
          setCurrentIndex(newIndex);
          trackCarouselSlide(newIndex, activeSlides[newIndex].title);
        }
      }
    };

    scroller.addEventListener('scroll', handleScroll, { passive: true });
    return () => scroller.removeEventListener('scroll', handleScroll);
  }, [currentIndex, activeSlides]);

  const scrollToSlide = (index: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const width = scroller.clientWidth;
    scroller.scrollTo({
      left: index * width,
      behavior: 'smooth',
    });
    setCurrentIndex(index);
    trackCarouselSlide(index, activeSlides[index].title);
  };

  const nextSlide = () => {
    const nextIdx = (currentIndex + 1) % activeSlides.length;
    scrollToSlide(nextIdx);
  };

  const prevSlide = () => {
    const prevIdx = (currentIndex - 1 + activeSlides.length) % activeSlides.length;
    scrollToSlide(prevIdx);
  };

  return (
    <div className="w-full my-8" data-wp-slot={wordpressKey}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          {eyebrow && <p className="editorial-kicker">{eyebrow}</p>}
          {title && <h3 className="text-2xl sm:text-3xl font-extrabold text-ink-950 mt-2">{title}</h3>}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-ink-600 mr-2" aria-live="polite">
            {currentIndex + 1} / {activeSlides.length}
          </span>
          <button
            type="button"
            onClick={prevSlide}
            className="safe-focus inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-950/20 bg-white text-ink-950 transition-all hover:bg-ink-950 hover:text-white"
            aria-label="Previous slide"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="safe-focus inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-950/20 bg-white text-ink-950 transition-all hover:bg-ink-950 hover:text-white"
            aria-label="Next slide"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel Scroller */}
      <div
        ref={scrollerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none rounded-2xl bg-ink-950 shadow-2xl"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        role="region"
        aria-roledescription="carousel"
        aria-label={title}
      >
        {activeSlides.map((slide, idx) => (
          <div
            key={slide.id || idx}
            className="w-full flex-shrink-0 snap-center relative min-h-[25rem] sm:min-h-[36rem] overflow-hidden group"
            role="group"
            aria-roledescription="slide"
            aria-label={`${idx + 1} of ${activeSlides.length}: ${slide.title}`}
          >
            <Image
              src={slide.image}
              alt={slide.alt || slide.title}
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,17,13,0.06),rgba(8,17,13,0.88)),linear-gradient(90deg,rgba(8,17,13,0.64),rgba(8,17,13,0.1))]" />
            
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 text-white z-10 flex flex-col justify-end">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {slide.category && (
                  <span className="rounded-[6px] border border-white/20 bg-white/16 px-3 py-1 text-xs font-black uppercase tracking-[0.1em] text-white backdrop-blur-sm">
                    {slide.category}
                  </span>
                )}
                {slide.location && (
                  <span className="rounded-[6px] border border-white/20 bg-white/16 px-3 py-1 text-xs font-black uppercase tracking-[0.1em] text-white backdrop-blur-sm">
                    {slide.location}
                  </span>
                )}
                <Stamp tone="white">Consent Filed</Stamp>
              </div>

              <h4 className="text-2xl sm:text-4xl font-extrabold leading-tight text-white max-w-3xl">
                {slide.title}
              </h4>

              {slide.caption && (
                <p className="mt-3 text-sm sm:text-base font-semibold leading-relaxed text-white/84 max-w-2xl">
                  {slide.caption}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Snap Progress Dots */}
      <div className="flex items-center justify-center gap-2 mt-4" role="tablist">
        {activeSlides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            role="tab"
            aria-selected={idx === currentIndex}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => scrollToSlide(idx)}
            className="safe-focus group flex h-11 min-w-11 items-center justify-center rounded-full"
          >
            <span className={`block h-2.5 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? 'w-8 bg-frad-green-700'
                : 'w-2.5 bg-ink-950/20 group-hover:bg-ink-950/40'
            }`} />
          </button>
        ))}
      </div>
    </div>
  );
}
