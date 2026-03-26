'use client';

export default function LatestNewsBlogsSkeleton() {
  const categories = ['Investment', 'Finance', 'Trading', 'Global'];

  return (
    <div className="bg-[#071E2F] text-white px-4 md:px-16 md:pt-24 pt-14 pb-8 md:mb-20 animate-pulse">
      <h2 className="text-2xl font-semibold mb-10">Latest News/Blogs</h2>

      {/* Mobile Dropdown */}
      <div className="block md:hidden mt-4 rounded-[10px] bg-gradient-to-r from-[#064C7C] to-[#BA833C] p-[2px] py-4 px-4">
        <div className="w-full h-10 bg-[#041434] rounded-[10px]" />
      </div>

      {/* Desktop Tabs */}
      <div className="hidden md:inline-block mt-4 rounded-[10px] bg-gradient-to-r from-[#064C7C] to-[#BA833C] p-[2px] py-4 px-4">
        <div className="flex rounded-full overflow-hidden gap-4">
          {categories.map((_, index) => (
            <div
              key={index}
              className="bg-[#041434] rounded-[10px] w-24 h-8"
            ></div>
          ))}
        </div>
      </div>

      {/* Blog Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:mt-8 mt-6">
        {Array(4)
          .fill(0)
          .map((_, idx) => (
            <div
              key={idx}
              className="flex flex-col h-full rounded-md overflow-hidden mt-4 md:mt-6"
            >
              <div className="w-full h-[200px] bg-gray-700 rounded-md"></div>

              <div className="flex flex-col flex-grow pt-4 gap-2">
                <div className="h-5 w-4/5 bg-gray-600 rounded" />
                <div className="h-4 w-1/2 bg-gray-600 rounded mt-auto flex justify-between" />
                <div className="flex justify-between text-[14px] md:text-[16px] text-gray-300 mt-1">
                  <div className="h-3 w-20 bg-gray-500 rounded" />
                  <div className="h-3 w-16 bg-gray-500 rounded ml-auto" />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
