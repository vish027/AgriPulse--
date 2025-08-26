import React from 'react'
import MainBanner from '../Components/MainBanner'
import Categories from '../Components/Categories'
import BestSeller from '../Components/BestSeller'
import BottomBanner from '../Components/BottomBanner'
import NewsLetter from '../Components/NewsLetter'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
const Home = () => {
  return (
    <div className='mt-10'>
      <MainBanner />
      <Categories />
      <BestSeller />
      <BottomBanner/>
      <NewsLetter />
      <Footer/>
      <Navbar/>
    </div>
  )
}

export default Home
