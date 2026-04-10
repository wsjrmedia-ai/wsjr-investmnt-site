'use client';

import { useEffect, useRef, useState } from 'react';
import { FaPlay, FaStar } from 'react-icons/fa';
import ButtonWithImage from '@/UI/AnimatedButton';

/**
 * Customer video testimonials section. Matches the site design system:
 *   - bg #071E2F (primary navy) with #0A273C cards
 *   - #BA833C gold accent, white text, Montserrat via --font-sans
 *   - Uses the section-heading / section-desc utilities from globals.css
 *   - Mirrors the layout conventions used by CaseStudies and WhyWallStreet
 *     (ButtonWithImage chip → heading → grid of cards)
 *
 * Shows both video-backed and text-only testimonials. Video cards start with
 * a click-to-play poster overlay and switch to a native HTML5 <video> element
 * with `playsInline` (so iOS stays inline) on first interaction.
 */

function StarRating({ value }) {
  if (!value) return null;
  const rounded = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div className="flex items-center gap-1 mt-2" aria-label={`${rounded} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar
          key={i}
          className={`text-sm ${i < rounded ? 'text-[#BA833C]' : 'text-gray-600'}`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const hasVideo = Boolean(testimonial.video_url);
  const poster = testimonial.img_link || '/Testimonial/cardbg.png';

  const handlePlay = () => {
    setIsPlaying(true);
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => {
        /* autoplay blocked — native controls let the visitor start manually */
      });
    });
  };

  return (
    <article className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#0A273C] border border-white/10 hover:border-[#BA833C] transition-colors duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
      {/* Media area */}
      {hasVideo ? (
        <div className="relative w-full aspect-video bg-black">
          {isPlaying ? (
            <video
              ref={videoRef}
              src={testimonial.video_url}
              controls
              playsInline
              preload="metadata"
              poster={poster}
              className="w-full h-full object-cover"
            />
          ) : (
            <button
              type="button"
              onClick={handlePlay}
              className="absolute inset-0 w-full h-full cursor-pointer"
              aria-label={`Play ${testimonial.name}'s video review`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 opacity-70 group-hover:opacity-50"
                style={{ backgroundImage: `url(${poster})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071E2F] via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-full bg-[#BA833C] flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
                  <FaPlay className="text-white text-lg md:text-xl ml-1" />
                </div>
              </div>
            </button>
          )}
        </div>
      ) : (
        // Text-only testimonial: avatar strip in place of the video player so
        // the card still balances the rest of the grid.
        <div className="relative w-full aspect-video flex items-center justify-center bg-gradient-to-br from-[#0A273C] to-[#071E2F]">
          {testimonial.img_link ? (
            <img
              src={testimonial.img_link}
              alt={testimonial.name}
              className="h-28 w-28 md:h-32 md:w-32 rounded-full object-cover border-4 border-[#BA833C]"
            />
          ) : (
            <div className="h-28 w-28 md:h-32 md:w-32 rounded-full bg-[#BA833C]/15 border-2 border-[#BA833C]/40 flex items-center justify-center text-4xl font-semibold text-[#BA833C]">
              {testimonial.name?.[0]?.toUpperCase() || '★'}
            </div>
          )}
        </div>
      )}

      {/* Body */}
      <div className="flex flex-col flex-grow p-6 md:p-7">
        {testimonial.content && (
          <p className="text-gray-300 text-sm md:text-[15px] italic leading-relaxed mb-6 flex-grow">
            &ldquo;{testimonial.content}&rdquo;
          </p>
        )}

        <div className="mt-auto">
          <h4 className="text-white font-semibold text-base md:text-lg">
            {testimonial.name}
          </h4>
          {(testimonial.designation || testimonial.company) && (
            <p className="text-[#BA833C] text-xs md:text-sm font-medium mt-0.5">
              {[testimonial.designation, testimonial.company].filter(Boolean).join(' · ')}
            </p>
          )}
          <StarRating value={testimonial.rating} />
        </div>
      </div>
    </article>
  );
}

export default function VideoTestimonialSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/testimonials', { cache: 'no-store' });
        if (!res.ok) throw new Error(`Failed to load testimonials (${res.status})`);
        const data = await res.json();
        if (!cancelled) setTestimonials(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="bg-[#071E2F] text-white px-4 md:px-16 py-16 md:py-20 font-sans">
      {/* Section header — mirrors the pattern used by CaseStudies */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-10 md:mb-14">
          <div className="mb-6">
            <ButtonWithImage text="Success Stories" image="none" />
          </div>
          <h2 className="section-heading leading-snug max-w-3xl mb-4">
            Hear From Our Successful Investors
          </h2>
          <p className="section-desc text-gray-400 max-w-2xl">
            Real people, real results. Watch how our investment strategies have
            impacted their financial journeys.
          </p>
        </div>

        {/* Content states */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden bg-[#0A273C] border border-white/5 animate-pulse"
              >
                <div className="aspect-video bg-white/5" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-white/10 rounded w-full" />
                  <div className="h-3 bg-white/10 rounded w-5/6" />
                  <div className="h-3 bg-white/10 rounded w-3/4" />
                  <div className="h-4 bg-white/10 rounded w-1/3 mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10 text-sm text-red-400">
            Could not load testimonials: {error}
          </div>
        ) : testimonials.length === 0 ? (
          // Empty state — keeps the section visible on fresh installs so the
          // admin can see the slot where their uploads will appear.
          <div className="mx-auto max-w-xl text-center py-12 border border-dashed border-[#BA833C]/40 rounded-2xl bg-[#0A273C]/40">
            <p className="text-gray-300 text-sm md:text-base">
              No testimonials yet. Upload customer review videos from the
              Dashboard <span className="text-[#BA833C] font-medium">Testimonials</span> page
              and they will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
