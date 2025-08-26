import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className='w-full flex justify-center mt-36 px-4'>
      <div className='relative w-full max-w-6xl rounded-xl overflow-hidden shadow-lg'>

        {/* Large screen banner */}
        <img 
          src={assets.banner2} 
          alt="banner" 
          className='hidden md:block w-full h-[360px] object-cover object-center rounded-xl' 
        />

        {/* Small screen banner */}
        <img 
          src={assets.main_banner_bg_sm} 
          alt="banner" 
          className='md:hidden w-full h-[180px] object-cover object-center rounded-xl' 
        />

        {/* Overlay Content */}
        <div className='absolute inset-0 flex flex-col items-center md:items-start justify-center px-6 md:px-12 text-white'>

          {/* Quote Section */}
          <div className='text-center md:text-left drop-shadow-xl'>
            <h1 className='text-2xl md:text-4xl font-bold mb-2'>
              🌱 "Cultivating Nature, Nourishing Life"
            </h1>
            <p className='text-sm md:text-lg max-w-xl'>
              Fresh, healthy, and sustainable products directly from the fields to your home.
            </p>
          </div>

          {/* Buttons */}
          <div className='flex items-center gap-4 mt-6 font-medium'>
            <Link 
              to={"/seller"} 
              className='group flex items-center gap-2 px-6 md:px-8 py-2.5 bg-green-700 hover:bg-green-800 transition rounded-full text-white shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95'
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
              className='group flex items-center gap-2 px-6 md:px-8 py-2.5 bg-green-700 hover:bg-green-800 transition rounded-full text-white shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95'
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
    </div>
  )
}

export default MainBanner
