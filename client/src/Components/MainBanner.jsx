import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className='relative'>
      {/* Large screen banner */}
      <img 
        src={assets.banner2} 
        alt="banner" 
        className='w-full hidden md:block h-[500px] object-cover' 
      />

      {/* Small screen banner */}
      <img 
        src={assets.main_banner_bg_sm} 
        alt="banner" 
        className='w-full md:hidden h-[250px] object-cover' 
      />

      {/* Overlay Content */}
      <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-20 md:pb-16 px-4 md:pl-18 lg:pl-24'>
        
        {/* Agriculture Quote */}
<div className="pl-1 md:pl-1">
  <h1 className='text-black text-1xl md:text-2xl lg:text-1xl font-bold mb-2 text-center md:text-left drop-shadow-lg'>
    🌱 "Cultivating Nature, Nourishing Life"
  </h1>
  <p className='text-black text-sm md:text-lg lg:text-xl max-w-xl text-center md:text-left opacity-100'>
    Fresh, healthy, and sustainable products directly from the fields to your home.
  </p>
</div>


        {/* Shop Now Button */}
      {/* Shop Now & Grower’s Hub Buttons Side by Side */}
<div className='flex items-center gap-4 mt-8 font-medium'>
  <Link 
    to={"/seller"} 
    className='group flex items-center gap-2 px-8 md:px-10 py-3 bg-gradient-to-r from-green-700 via-green-700 to-green-700 hover:from-green-600 hover:to-green-800 transition-all duration-300 rounded-full text-white cursor-pointer shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 animate-bounce-slow'
  >
    Grower’s Hub
    <img 
      className='md:hidden transition group-hover:translate-x-1' 
      src={assets.white_arrow_icon} 
      alt="arrow" 
    />
  </Link>

  <Link 
    to={"/products"} 
    className='group flex items-center gap-2 px-8 md:px-10 py-3 bg-gradient-to-r from-green-700 via-green-700 to-green-700 hover:from-green-600 hover:to-green-800 transition-all duration-300 rounded-full text-white cursor-pointer shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 animate-bounce-slow'
  >
    Shop now
    <img 
      className='md:hidden transition group-hover:translate-x-1' 
      src={assets.white_arrow_icon} 
      alt="arrow" 
    />
  </Link>
</div>

      </div>
    </div>
  )
}

export default MainBanner
