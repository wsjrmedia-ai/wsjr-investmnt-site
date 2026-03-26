'use client';

export default function NewsDetailSkeleton() {
  return (
    <div className="bg-[#071E2F] text-white pb-8 animate-pulse">
      {/* Category Skeleton */}
      <div className="inline-block py-2 mb-6">
        <div className="h-6 w-32 rounded-full bg-[#1f2d3d]"></div>
      </div>

      {/* Title Skeleton */}
      <div className="h-8 w-3/4 bg-[#1f2d3d] mb-4 rounded"></div>

      {/* Paragraph skeletons */}
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-4 w-full bg-[#1f2d3d] rounded"></div>
        ))}
        <div className="h-4 w-5/6 bg-[#1f2d3d] rounded"></div>
        <div className="h-4 w-2/3 bg-[#1f2d3d] rounded"></div>
      </div>

      {/* Image Placeholder */}
      <div className="mt-8 h-[300px] w-full bg-[#1f2d3d] rounded-lg"></div>
    </div>
  );
}
