import React from 'react'

const SkeletonLoader = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10">
          {/* Placeholder lines */}
          <div className="bg-gray-300 h-[20rem] mb-2 rounded-md animate-pulse"></div>
          <div className="bg-gray-300 h-[20rem] mb-2 rounded-md animate-pulse"></div>
          <div className="bg-gray-300 h-[20rem] mb-2 rounded-md animate-pulse"></div>
          <div className="bg-gray-300 h-[20rem] mb-2 rounded-md animate-pulse"></div>
          <div className="bg-gray-300 h-[20rem] mb-2 rounded-md animate-pulse"></div>
          <div className="bg-gray-300 h-[20rem] mb-2 rounded-md animate-pulse"></div>
        </div>
      );
}

export default SkeletonLoader