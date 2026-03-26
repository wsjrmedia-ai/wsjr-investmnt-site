'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ButtonWithImage from '@/UI/AnimatedButton';
import BlogCategoryButton from '@/UI/BlogCategory';
import { getBlogsByTag } from '@/lib/blogUtils';
import Link from 'next/link';
import PopularNewsSkeleton from '../Loading/PopularNewsSkeleton';
import TopStories from './TopStories';

export default function PopularNews() {
  const [popularBlogs, setPopularBlogs] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBlogsByTag('popular');
        setPopularBlogs(data);
      } catch (error) {
        console.error('Failed to fetch popular blogs:', error);
      }
    };

    fetchData();
  }, []);

  const mainNews = popularBlogs[0];
  const sideNews = popularBlogs.slice(1);

  useEffect(() => {
    if (sideNews.length <= 3 || typeof window === 'undefined' || window.innerWidth < 1024) return;

    const container = scrollRef.current;
    let scrollAmount = 0;

    const scrollInterval = setInterval(() => {
      if (!container) return;

      scrollAmount += 1;
      container.scrollTop += 1;

      if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
        container.scrollTop = 0;
        scrollAmount = 0;
      }
    }, 100);

    return () => clearInterval(scrollInterval);
  }, [sideNews]);

  if (!mainNews) return <PopularNewsSkeleton />;
  return (
    <div className="bg-[#071E2F] text-white px-4 md:px-16 md:py-24 pt-14 pb-8 md:pb-16">
      {/* Top Info Line */}
      <div className="text-xs md:text-sm text-gray-300  md:mb-8 mb-6">
        <ButtonWithImage text={'News / Blogs / Articles from'} />
      </div>

      {/* Section Heading */}
      <h2 className="section-heading mb-6 md:mb-14">Popular News</h2>

      {/* News Grid */}
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
        {/* Left: Main News */}
        <div className="w-full lg:w-1/2 flex flex-col">

          <Link
            key={mainNews.id}
            href={`/blogs/${encodeURIComponent(mainNews.redirectPath)}`}
          >

            <div className="relative w-full h-[250px] lg:h-full lg:min-h-[350px]">
              <Image
                src={mainNews.image}
                alt={mainNews.title}
                fill
                className="rounded-md object-cover"
              />
            </div>

            <div className="flex flex-col justify-between flex-grow pt-3 md:pt-4">
              <h3 className="text-base md:text-[27px] leading-snug">
                {mainNews.title}
              </h3>
              <div className="mt-2 md:mt-3 flex justify-between items-center text-xs md:text-sm text-gray-300">
                <span className="py-[2px] md:py-1 rounded-md text-white text-[10px] md:text-xs">
                  <BlogCategoryButton text={mainNews.categorytype || 'wallstreet'} />
                </span>
                <span className="text-[12px] md:text-[16px] whitespace-nowrap">
                  {mainNews.date} &nbsp;|&nbsp; {mainNews.writer}
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Right: Side News with Scroll */}
        <div
          className="w-full lg:w-1/2 flex flex-col gap-6 md:gap-8 cursor-pointer overflow-y-auto hide-scrollbar scroll-auto"
          style={{ maxHeight: '650px' }}
          ref={scrollRef}
        >
          {/* <TopStories /> */}

          
          {sideNews.map((item) => (

            <Link
              key={item.id}
              href={`/blogs/${encodeURIComponent(item.redirectPath)}`}
            >
              <div key={item.id} className="flex md:gap-5 gap-3 items-start h-[170px] md:h-[190px]">
                <div className="w-[150px] md:w-[211px] h-[160px] md:h-[190px] relative flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between py-0 h-full w-full">
                  <div>
                    <h4 className="text-[16px] md:text-[21px] leading-snug">{item.title}</h4>
                    <p className="text-xs md:text-[16px] text-white mt-2 md:mt-3">
                      {item.description}
                    </p>
                  </div>
                  <div className="text-[12px] md:text-[16px] text-gray-400 mt-1 flex justify-between">
                    <span>{item.date}</span>
                    <span className="ml-auto">{item.writer}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
