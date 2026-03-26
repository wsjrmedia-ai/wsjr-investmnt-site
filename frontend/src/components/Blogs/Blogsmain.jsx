'use client';

import React, { useState, useRef, useEffect } from 'react';
import Hero from './Hero';
import PopularNews from './PopularNews';
import LatestNewsBlogs from './LatestNewsBlogs';
import { searchBlogs, getBlogsByCategory } from '@/lib/blogUtils';

export const Blogsmain = () => {
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const latestRef = useRef(null);

  // ✅ Fetch blogs on mount
  useEffect(() => {
    const fetchInitialBlogs = async () => {
      try {
        const blogs = await getBlogsByCategory('');
        setFilteredBlogs(Array.isArray(blogs) ? blogs : []);
      } catch (error) {
        console.error('Failed to load initial blogs:', error);
        setFilteredBlogs([]); // fallback
      }
    };

    fetchInitialBlogs();
  }, []);

  // ✅ Handle search
  const handleSearch = async (keyword) => {
    try {
      const results =
        keyword.trim() === ''
          ? await getBlogsByCategory('')
          : await searchBlogs(keyword);

      setFilteredBlogs(Array.isArray(results) ? results : []);
      if (keyword.trim() && latestRef.current) {
        latestRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Search failed:', error);
      setFilteredBlogs([]);
    }
  };

  return (
    <div>
      <Hero onSearch={handleSearch} />
      <PopularNews />
      <div ref={latestRef}>
        <LatestNewsBlogs blogs={filteredBlogs} />
      </div>
    </div>
  );
};
