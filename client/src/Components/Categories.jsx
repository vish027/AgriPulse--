import React from 'react'
import { categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Categories = () => {
  const { navigate } = useAppContext()

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Categories</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-8 gap-70">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`group cursor-pointer flex flex-col justify-center items-center 
              border border-black-800 hover:shadow-xl transition-all duration-300 
              rounded-xl w-44 h-44 md:w-52 md:h-52 p-6
              ${index % 5 === 0 ? 'bg-green-100' : 
                index % 5 === 1 ? 'bg-yellow-100' : 
                index % 5 === 2 ? 'bg-blue-100' : 
                index % 5 === 3 ? 'bg-pink-100' : 
                'bg-purple-100'}`}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`)
              scrollTo(0, 0)
            }}
          >
            <img
              src={category.image}
              alt={category.text}
              className="group-hover:scale-110 transition-transform duration-300 max-w-24 md:max-w-28"
            />
            <p className="text-sm md:text-base font-semibold mt-4 text-center">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories 
