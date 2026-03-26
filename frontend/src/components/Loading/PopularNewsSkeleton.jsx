'use client';

export default function PopularNewsSkeleton() {
  return (
    <div className="bg-[#071E2F] text-white px-4 md:px-16 md:pt-24 pt-14 pb-8 animate-pulse">
      {/* Top Info Line */}
      <div className="text-xs md:text-sm text-gray-300 mb-4 md:mb-10">
        <div className="w-48 h-5 bg-gray-700 rounded"></div>
      </div>

      {/* Section Heading */}
      <div className="h-8 w-40 bg-gray-600 mb-6 md:mb-14 rounded"></div>

      {/* News Grid */}
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
        {/* Left: Main News */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="relative w-full h-[250px] lg:min-h-[350px] bg-gray-700 rounded-md" />

          <div className="flex flex-col gap-2">
            <div className="h-6 w-3/4 bg-gray-600 rounded"></div>
            <div className="h-4 w-full bg-gray-700 rounded mt-1"></div>
          </div>
        </div>

        {/* Right: Side News Skeletons */}
        <div
          className="w-full lg:w-1/2 flex flex-col gap-6 md:gap-8 overflow-y-auto"
          style={{ maxHeight: '650px' }}
        >
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="flex md:gap-5 gap-3 items-start h-[160px] md:h-[190px]"
              >
                <div className="w-[150px] md:w-[211px] h-[160px] md:h-[190px] bg-gray-700 rounded-md flex-shrink-0" />
                <div className="flex flex-col justify-between py-0 h-full w-full gap-2">
                  <div>
                    <div className="h-5 md:h-6 w-5/6 bg-gray-600 rounded"></div>
                    <div className="h-4 md:h-5 w-full bg-gray-700 rounded mt-2"></div>
                    <div className="h-4 md:h-5 w-2/3 bg-gray-700 rounded mt-1"></div>
                  </div>
                  <div className="flex justify-between text-xs md:text-sm text-gray-400 mt-2">
                    <div className="h-3 w-16 bg-gray-600 rounded" />
                    <div className="h-3 w-20 bg-gray-600 rounded ml-auto" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
