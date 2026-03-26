'use client';

import { getBlogContentAndCategory } from '@/lib/blogUtils';
import { useEffect, useState } from 'react';
import LZString from 'lz-string';
import BlogCategoryButton from '@/UI/BlogCategory';
import RelatedBlogs from './RelatedBlogs';
import NewsDetailSkeleton from '../Loading/NewsDetailSkeleton';

export default function NewsDetail({ id }) {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchAndDecompress = async () => {
      try {
        const result = await getBlogContentAndCategory({
          redirectPath: id
        });

        const decompressedContent = result.content;
        setContent(decompressedContent || 'Content unavailable');
        setCategory(result.category || 'Unknown');
        setTags(result.tags || []);
      } catch (error) {
        console.error('Failed to load blog content:', error);
        setContent('Failed to load content.');
      } finally {
        setLoading(false);
      }
    };

    fetchAndDecompress();
  }, []);

  return (
    <>
      <div className="bg-[#071E2F] text-white px-4 md:px-16 md:pt-24 pt-14 pb-8">
        {loading ? (
           <NewsDetailSkeleton />
        ) : (
          <>
            {/* Category Badge */}
            <div className="inline-block py-2  mb-6">
              <BlogCategoryButton text={category || 'wallstreet'} />

            </div>

            {/* Blog HTML content */}
            <div
              className="prose prose-invert max-w-none
    prose-img:rounded-lg
    prose-img:my-6
    prose-img:w-full
    prose-img:max-h-[300px]  // <-- Add this
    prose-img:object-contain  // or object-cover
    prose-h2:text-white
    prose-p:text-white"
              dangerouslySetInnerHTML={{ __html: content }}
            />

          </>
        )}
      </div>
      <RelatedBlogs excludeId={id} categoryList={tags} />
    </>
  );
}
