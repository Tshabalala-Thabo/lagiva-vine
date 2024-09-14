import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
      {Array.from({ length: 8 }).map((_, index) => ( // Adjust the number of skeletons as needed
        <div key={index} className="rounded-sm overflow-hidden cursor-pointer w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)] max-w-xs bg-gray-200 animate-pulse">
          <div className="relative bg-stale w-full pt-[125%]">
            <div className="absolute inset-0 w-full h-full bg-gray-300" />
          </div>
          <div className="p-4 text-center">
            <div className="h-4 bg-gray-300 rounded mb-2" />
            <div className="h-4 bg-gray-300 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;