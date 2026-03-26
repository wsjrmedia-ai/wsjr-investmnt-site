'use client';

export default function PressReleaseSkeleton() {
  return (
    <section className="bg-[#071E2F] text-white px-4 md:px-16 py-14 animate-pulse overflow-hidden">
      {/* Section Header */}
      <div className="mb-8">
        <div className="w-40 h-6 bg-gray-700 rounded-md"></div>
      </div>

      {/* Auto-Scrolling Row Skeleton */}
      <div className="relative w-full overflow-hidden">
        <div className="flex gap-10 animate-scroll">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="flex gap-4 min-w-[320px]"
            >
              {/* Image placeholder */}
              <div className="w-[120px] h-[120px] bg-gray-700 rounded-md"></div>

              {/* Content placeholder */}
              <div className="flex flex-col justify-between w-full">
                <div className="space-y-2">
                  <div className="w-3/4 h-4 bg-gray-700 rounded"></div>
                  <div className="w-full h-3 bg-gray-700 rounded"></div>
                </div>
                <div className="w-20 h-3 bg-gray-700 rounded mt-3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tailwind Custom Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
