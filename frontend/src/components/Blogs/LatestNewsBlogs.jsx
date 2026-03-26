'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LatestNewsBlogsSkeleton from '../Loading/LatestNewsBlogsSkeleton';

export default function LatestNewsBlogs({ blogs }) {
  const categories = ['Investment', 'Finance', 'Trading', 'Global'];
  const [activeCategory, setActiveCategory] = useState('');

  const filteredNews =
    activeCategory === ''
      ? blogs
      : blogs.filter((item) => item.category.includes(activeCategory));

  if (!blogs || blogs.length === 0) return <LatestNewsBlogsSkeleton />;

  return (
    <div className="bg-[#071E2F] text-white px-4 md:px-16 md:py-24 py-14 pb-8 md:mb-20 ">
      <h2 className="text-2xl font-semibold mb-10">Latest News/Blogs</h2>

      {/* Mobile Dropdown */}
      <div className="block md:hidden mt-4 rounded-[10px] bg-gradient-to-r from-[#064C7C] to-[#BA833C] p-[2px] py-4 px-4 cursor-pointer">
        <select
          className="w-full bg-[#041434] text-white rounded-[10px] px-4 py-2 min-h-[40px]"
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden md:inline-block mt-4 rounded-[10px] bg-gradient-to-r from-[#064C7C] to-[#BA833C] p-[2px] py-4 px-4 cursor-pointer">
        <div className="flex rounded-full overflow-hidden">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-sm transition-all duration-300 cursor-pointer ${activeCategory === cat
                ? 'bg-[rgba(4,20,52,0.1)] text-white font-bold rounded-[10px]'
                : 'text-white'
                }`}
            >
              {cat}
            </button>
          ))}

        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:mt-8 mt-6">
        {filteredNews.map((item) => (
          <Link
            key={item.id}
            href={`/blogs/${encodeURIComponent(item.redirectPath)}`}
            className="flex flex-col h-full rounded-md overflow-hidden mt-4 md:mt-6"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={400}
              height={240}
              className="w-full h-[200px] object-cover rounded-md"
            />
            <div className="flex flex-col flex-grow pt-4">
              <h4 className="md:text-[21px] text-[18px] leading-snug">
                {item.title}
              </h4>

              {/* Push this section to the bottom */}
              <div className="mt-auto text-[14px] md:text-[16px] text-gray-300 flex justify-between">
                <span>{item.date}</span>
                <span className="ml-auto">{item.writer}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
