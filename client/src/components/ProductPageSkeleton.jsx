import React from 'react'

const ProductPageSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-3 mt-5 py-10 px-10">
        <div className='mr-5'>
          <div className="bg-gray-300 h-[24rem] mb-2 rounded-md animate-pulse"></div>
        </div>
        <div className='grid grid-row-1'>
          <div className="bg-gray-300 h-[2rem] mb-2 rounded-md animate-pulse"></div>
          <div className="bg-gray-300 h-[2rem] mb-2 rounded-md animate-pulse"></div>
          <div className="bg-gray-300 h-[2rem] mb-2 rounded-md animate-pulse"></div>
          <div className="bg-gray-300 h-[2rem] mb-2 rounded-md animate-pulse"></div>
          <div className="bg-gray-300 h-[2rem] mb-2 rounded-md animate-pulse"></div>
          <div className="bg-gray-300 h-[2rem] mb-2 rounded-md animate-pulse"></div>
        </div>
    </div>
  )
}

export default ProductPageSkeleton