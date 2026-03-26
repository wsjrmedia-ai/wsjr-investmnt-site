'use client';

export default function RelatedBlogsSkeleton() {
  return (
    <section className="bg-[#071E2F] text-white px-4 md:px-16 md:pt-24 pt-14 pb-8 animate-pulse">
      <h2 className="text-2xl font-semibold mb-10">Related News/Blogs</h2>

      <div className="relative">
        {/* Left Arrow */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#BA833C] w-[30px] h-[30px] flex items-center justify-center rounded-full shadow-md" />

        {/* Right Arrow */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#BA833C] w-[30px] h-[30px] flex items-center justify-center rounded-full shadow-md" />

        {/* Skeleton Cards */}
        <div
          className="flex gap-6 overflow-x-auto hide-scrollbar px-2 py-2"
          style={{
            scrollSnapType: 'x mandatory',
            scrollSnapAlign: 'start',
            scrollPadding: '0 16px',
            scrollBehavior: 'smooth',
          }}
        >
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="flex flex-col flex-shrink-0 min-w-[300px] max-w-[300px] rounded-md overflow-hidden p-2 bg-[#0a1a27]"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="w-full h-[200px] bg-gray-700 rounded-md" />

                <div className="flex flex-col flex-grow pt-4 gap-2">
                  <div className="h-5 w-4/5 bg-gray-600 rounded" />
                  <div className="flex justify-between mt-2 text-gray-400 text-sm">
                    <div className="h-3 w-16 bg-gray-500 rounded" />
                    <div className="h-3 w-16 bg-gray-500 rounded ml-auto" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
