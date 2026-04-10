'use client';

import { useEffect, useRef, useState } from 'react';
import ButtonWithImage from '@/UI/AnimatedButton';
import { FaPlay } from 'react-icons/fa';

/**
 * Testimonial card — handles both video-backed and text-only rows.
 *
 * Video rows start with a click-to-play overlay using the client's photo
 * (img_link) as a poster. Clicking reveals the native <video> element and
 * auto-plays. Text-only rows render a simpler avatar-and-quote card.
 */
function TestimonialCard({ testimonial }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const hasVideo = Boolean(testimonial.video_url);
  const poster = testimonial.img_link || '/Testimonial/cardbg.png';

  const handlePlay = () => {
    setIsPlaying(true);
    // Defer until after the <video> has mounted.
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => {
        /* autoplay blocked — controls let the user start it manually */
      });
    });
  };

  return (
    <div className="flex flex-col bg-transparent rounded-2xl overflow-hidden border border-gray-700 hover:border-[#BA833C] transition duration-300">
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
              className="absolute inset-0 w-full h-full cursor-pointer group"
              aria-label={`Play ${testimonial.name}'s video review`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-40 transition-opacity"
                style={{ backgroundImage: `url(${poster})` }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#BA833C] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <FaPlay className="text-white text-xl ml-1" />
                </div>
              </div>
            </button>
          )}
        </div>
      ) : (
        // Text-only testimonial: show avatar band instead of a video slot so
        // the card still looks like the rest of the grid.
        <div className="relative w-full aspect-video bg-[#0A273C] flex items-center justify-center">
          {testimonial.img_link ? (
            <img
              src={testimonial.img_link}
              alt={testimonial.name}
              className="h-28 w-28 rounded-full object-cover border-4 border-[#BA833C]"
            />
          ) : (
            <div className="h-28 w-28 rounded-full bg-[#BA833C]/20 flex items-center justify-center text-3xl text-[#BA833C] font-bold">
              {testimonial.name?.[0] || '★'}
            </div>
          )}
        </div>
      )}

      <div className="p-6 flex flex-col flex-grow bg-[#0A273C]">
        {testimonial.content && (
          <p className="text-gray-300 text-sm italic mb-6 flex-grow leading-relaxed">
            &ldquo;{testimonial.content}&rdquo;
          </p>
        )}
        <div>
          <h4 className="text-white font-semibold text-lg">{testimonial.name}</h4>
          <p className="text-[#BA833C] text-sm">
            {testimonial.designation || testimonial.company || ''}
          </p>
          {testimonial.rating ? (
            <p className="text-yellow-400 text-xs mt-1">
              {'★'.repeat(Math.max(0, Math.min(5, testimonial.rating)))}
              <span className="text-gray-600">
                {'★'.repeat(5 - Math.max(0, Math.min(5, testimonial.rating)))}
              </span>
            </p>
          ) : null}
        </div>
      </div>
    </div>
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
        if (!res.ok) throw new Error('Failed to load testimonials');
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

  // Hide the section entirely if there's nothing to show. Avoids rendering
  // an empty grid heading on a fresh install where no testimonials exist.
  if (!loading && !error && testimonials.length === 0) {
    return null;
  }

  return (
    <main className="bg-[#071E2F] text-white px-4 md:px-16 pb-16 py-16 md:py-20 font-sans">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="mb-6">
          <ButtonWithImage text="Success Stories" image="none" />
        </div>
        <h2 className="section-heading mb-4 leading-snug max-w-3xl">
          Hear From Our Successful Investors
        </h2>
        <p className="text-sm text-gray-400 max-w-2xl">
          Real people, real results. Watch how our investment strategies have
          impacted their financial journeys.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center text-gray-400">Loading…</div>
      ) : error ? (
        <div className="flex justify-center text-red-400 text-sm">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      )}
    </main>
  );
}
