import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Navbar = () => {
  const [open, setOpen] = React.useState(false)
  const { user, setUser, setShowUserLogin, navigate, setSearchQuery, searchQuery, getCartCount, axios } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/user/logout`
);

      if (data.success) {
        toast.success(data.message)
        setUser(null);
        navigate('/')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

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

        {/* ✅ Right Side (Cart + Login/Profile) */}
        <div className="flex items-center gap-6">
          {/* Cart */}
          <div onClick={() => navigate("/cart")} className="relative cursor-pointer hover:scale-105 transition">
            <img src={assets.nav_cart_icon} alt='cart' className='w-6 opacity-100 invert' />
            <button className="absolute -top-2 -right-3 text-xs text-white bg-red-600 w-[18px] h-[18px] rounded-full flex items-center justify-center shadow-md">
              {getCartCount()}
            </button>
          </div>

          {/* Login/Profile */}
          {!user ? (
            <button
              onClick={() => setShowUserLogin(true)}
              className="cursor-pointer px-6 py-2 bg-white text-green-700 font-medium hover:bg-gray-100 transition rounded-full shadow-md"
            >
              Login
            </button>
          ) : (
            <div className='relative group'>
              <img src={assets.profile_icon} className='w-10 rounded-full border-2 border-white shadow-sm' alt="profile" />
              <ul className='hidden group-hover:block absolute top-12 right-0 bg-white shadow-lg border border-green-200 py-2.5 w-36 rounded-md text-sm z-40 animate-fadeIn'>
                <li onClick={() => navigate("my-orders")} className='p-2 pl-3 hover:bg-green-50 cursor-pointer'>My Orders</li>
                <li onClick={logout} className='p-2 pl-3 hover:bg-green-50 cursor-pointer'>Logout</li>
              </ul>
            </div>
          )}
        </div>

      </nav>

      {/* ✅ Content Offset so content isn’t hidden */}
      <div className="pt-20"></div>
    </>
  )
}

export default Navbar
