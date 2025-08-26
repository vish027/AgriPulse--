import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {
  const [open, setOpen] = React.useState(false)
  const { navigate, setSearchQuery, searchQuery, getCartCount } = useAppContext();

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products")
    }
  }, [searchQuery])

  return (
    <>
      {/* ✅ Full-Screen Navbar with Green BG */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-green-600 shadow-md">

        {/* ✅ Left Side (Back + Logo) */}
        <div className="flex items-center gap-6">
          <NavLink to='/' onClick={() => setOpen(false)}>
            <div>
              <img className="h-12" src={assets.back_icon} alt="back" />
            </div>
          </NavLink>

          <NavLink to='/' onClick={() => setOpen(false)}>
            <div className="hover:bg-green-700 transition rounded-md p-1">
              <img className="h-12" src={assets.logo2} alt="logo" />
            </div>
          </NavLink>
        </div>

        {/* ✅ Middle (Links + Search) */}
        <div className="hidden sm:flex items-center gap-8 font-medium text-white">
          <NavLink to='/' className="hover:text-gray-200 transition">Home</NavLink>
          <NavLink to='/products' className="hover:text-gray-200 transition">All Product</NavLink>
          <NavLink to='/' className="hover:text-gray-200 transition">Contact</NavLink>

          {/* Search Box */}
          <div className="hidden lg:flex items-center text-sm gap-50 border border-white px-3 rounded-full bg-green-500 shadow-sm hover:shadow-md transition">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-200 text-white"
              type="text"
              placeholder="Search products"
            />
            <img src={assets.search_icon} alt='search' className='w-4 h-4 opacity-80 invert' />
          </div>
        </div>

        {/* ✅ Right Side (Cart only) */}
        <div className="flex items-center gap-6">
          {/* Cart */}
          <div onClick={() => navigate("/cart")} className="relative cursor-pointer hover:scale-105 transition">
            <img src={assets.nav_cart_icon} alt='cart' className='w-6 opacity-100 invert' />
            <button className="absolute -top-2 -right-3 text-xs text-white bg-red-600 w-[18px] h-[18px] rounded-full flex items-center justify-center shadow-md">
              {getCartCount()}
            </button>
          </div>
        </div>

      </nav>

      {/* ✅ Content Offset so content isn’t hidden */}
      <div className="pt-20"></div>
    </>
  )
}

export default Navbar
