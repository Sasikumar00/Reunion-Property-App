import React from 'react'

const FormSkeleton = () => {
  return (
    <div className='grid grid-row-1'>
          <div className="bg-gray-300 h-[2rem] mb-2 rounded-md animate-pulse"></div>
          <div className="bg-gray-300 h-[2rem] mb-2 rounded-md animate-pulse"></div>
          <div className="bg-gray-300 h-[2rem] mb-2 rounded-md animate-pulse"></div>
          <div className="bg-gray-300 h-[2rem] mb-2 rounded-md animate-pulse"></div>
          <div className="bg-gray-300 h-[2rem] mb-2 rounded-md animate-pulse"></div>
          <div className="bg-gray-300 h-[2rem] mb-2 rounded-md animate-pulse"></div>
    </div>
  )
}

export default FormSkeleton