'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogsByCategory } from '@/lib/blogUtils';
import RelatedBlogsSkeleton from '../Loading/RelatedBlogsSkeleton';

const LOOP_INTERVAL = 3000;
const CARD_WIDTH = 280;

export default function RelatedBlogs({ excludeId, categoryList }) {
  const scrollRef = useRef();
  const [blogs, setBlogs] = useState([]);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const result = await getBlogsByCategory('');
      setBlogs(result || []);
    };
    fetchBlogs();

    const timer = setTimeout(() => setShowSkeleton(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const filteredNews = blogs.filter(
    (item) =>
      item.redirectPath !== excludeId &&
      categoryList.some((cat) => item.category.includes(cat))
  );

  useEffect(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;

    const interval = setInterval(() => {
      if (!container) return;
      container.scrollBy({ left: CARD_WIDTH, behavior: 'smooth' });

      // seamless loop reset
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }
    }, LOOP_INTERVAL);

    return () => clearInterval(interval);
  }, [filteredNews]);

  if (filteredNews.length === 0 && showSkeleton) {
    return <RelatedBlogsSkeleton />;
  }
  if (filteredNews.length === 0 && !showSkeleton) {
    return null;
  }

  return (
    <section className="bg-[#071E2F] text-white px-4 md:px-16 md:pt-24 pt-14 pb-8">
      <h2 className="text-2xl font-semibold mb-10">Related News/Blogs</h2>

      <div className="relative">
        <button
          onClick={() =>
            scrollRef.current.scrollBy({ left: -CARD_WIDTH, behavior: 'smooth' })
          }
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#BA833C] z-60 w-[30px] h-[30px] flex items-center justify-center rounded-full cursor-pointer shadow-md hover:bg-yellow-500 transition"
        >
          <Image src="/service/arrowleft.png" alt="Scroll Left" width={27} height={27} />
        </button>

        <button
          onClick={() =>
            scrollRef.current.scrollBy({ left: CARD_WIDTH, behavior: 'smooth' })
          }
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#BA833C] w-[30px] h-[30px] flex items-center justify-center rounded-full shadow-md cursor-pointer hover:bg-yellow-500 transition"
        >
          <Image src="/service/arrowright.png" alt="Scroll Right" width={27} height={27} />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar px-2 py-2"
          style={{
            scrollSnapType: 'x mandatory',
            scrollSnapAlign: 'start',
            scrollPadding: '0 16px',
            scrollBehavior: 'smooth',
          }}
        >
          {[...filteredNews, ...filteredNews].map((item, idx) => (
            <Link
              key={item.id + '-' + idx}
              href={`/blogs/${encodeURIComponent(item.redirectPath)}`}
              className="flex flex-col flex-shrink-0 min-w-[300px] max-w-[300px] rounded-md overflow-hidden p-2"
              style={{ scrollSnapAlign: 'start' }}
            >
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={240}
                className="w-full h-[200px] object-cover rounded-md"
              />
              <div className="flex flex-col flex-grow pt-4">
                <h4 className="md:text-[21px] text-[18px] leading-snug">{item.title}</h4>
                <div className="text-[14px] md:text-[16px] text-gray-300 flex justify-between mt-2">
                  <span>{item.date}</span>
                  <span className="ml-auto">{item.writer}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
