import React from 'react'
import '../herostyle.css'

const HeroContent = () => {
  return (
    <div id='hero' className='relative w-full bg-gray-700 h-[20rem] flex flex-col items-center justify-center px-5'>
        <h1 className='relative z-10 text-4xl md:text-5xl font-bold text-white'>Get the best deals with ListBuddy!</h1>
        <p className='relative z-10 text-white text-xl md:text-2xl'>Few clicks and get your property for sale</p>
    </div>
  )
}

export default HeroContent