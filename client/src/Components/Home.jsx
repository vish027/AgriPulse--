import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const categories = [
    {
      title: "Vegetable Seeds",
      desc: "High-yield & disease resistant",
      img: "https://media.istockphoto.com/id/964325260/photo/various-of-legumes-in-sack-bag.jpg?s=612x612&w=0&k=20&c=CNM8WqPgGwlR7UUMoZejem2EfsQp5wFBk5skVk14FnE=",
    },
    {
      title: "Fruit Seeds",
      desc: "Bursting with flavour",
      img: "https://media.istockphoto.com/id/1194237069/photo/assortment-of-nuts-seeds-and-fruits-top-view.webp?b=1&s=612x612&w=0&k=20&c=LZqoLlhlAtul47xKTvLdzEKIw7bUIidVOrMrvs-NTvQ=",
    },
    {
      title: "Grains",
      desc: "Staples for every farmer",
      img: "https://graintecindustries.com/wp-content/uploads/2024/11/pulses-variety_NEW-AFRICA-STOCK.ADOBE_.COM_e.jpg",
    },
    {
      title: "Bio Fertilizers",
      desc: "Natural soil boosters",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFcTz8e6Tdmf3cfEvLlNl_NFJJlUxEavWrdw&s",
    },
    {
      title: "Pesticides",
      desc: "Safe & effective protection",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4sBNTSqtoZB6HVb6XOkQKGMHx0PtKyXeBow&s",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f6fdf8] text-gray-800 font-sans">
      {/* Global Custom CSS */}
      <style>{`
        .hero-bg {
          background-image: linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('https://thumbs.dreamstime.com/b/corn-sprouts-spring-field-fresh-green-plants-new-life-grows-rich-soil-agriculture-eco-farming-background-young-shoots-sunlight-385610136.jpg');
          background-size: cover;
          background-position: center;
        }
        @keyframes slideLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .slider-track {
          display: flex;
          gap: 1rem;
          animation: slideLeft 20s linear infinite;
        }
        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
        .floaty {
          animation: floaty 3.5s ease-in-out infinite;
        }
        @keyframes floaty {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-green-100 shadow-sm">
  <nav className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
    {/* Logo Section */}
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-md bg-green-700 flex items-center justify-center text-white font-bold">
        Ag
      </div>
      <span className="font-semibold text-lg text-green-800">AgriPulse</span>
    </div>

    {/* Tagline */}
    <div className="hidden md:flex items-center justify-center flex-1">
      <p className="italic text-sm md:text-base text-green-700">
        "Growing together — from seed to supper"
      </p>
    </div>

    {/* Navigation Links */}
    <div className="flex items-center gap-5">
      <Link to="/" className="text-sm hover:text-green-800 font-medium">
        Home
      </Link>
      <Link to="/products" className="text-sm hover:text-green-800 font-medium">
        Products
      </Link>
      <Link to="/order" className="text-sm hover:text-green-800 font-medium">
        Orders
      </Link>
      <a href="#about" className="text-sm hover:text-green-800 font-medium">
        About
      </a>
      <a href="#contact" className="text-sm hover:text-green-800 font-medium">
        Contact
      </a>

      {/* Cart Icon → navigates to MyCart */}
      <Link
        to="/mycart"
        className="p-2 rounded-md hover:bg-green-100 transition"
        aria-label="cart"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-green-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4"
          />
          <circle cx="10" cy="20" r="1" />
          <circle cx="18" cy="20" r="1" />
        </svg>
      </Link>
    </div>
  </nav>
</header>


      {/* Hero Section */}
      <main className="hero-bg">
        <section className="max-w-6xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-8 text-white">
          <div className="flex-1 p-8 rounded-2xl bg-black/40 backdrop-blur-sm shadow-lg">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Grow Smart. Farm Better.</h1>
            <p className="mt-4 text-gray-100 text-lg">Tools, seeds, and guidance for small & medium growers — curated with care.</p>
            <div className="mt-6 flex gap-4">
              <Link
                to="/add-product"
                className="px-5 py-3 rounded-xl border-2 border-white font-semibold hover:bg-white hover:text-green-700 transition-all duration-300"
              >
                Growers Hub
              </Link>
              <Link
                to="/products"
                className="px-5 py-3 rounded-xl bg-white text-green-700 font-semibold shadow floaty"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Categories Section */}
      <section id="shop" className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-green-700">Shop by Category</h2>
          <div className="overflow-hidden rounded-lg border border-green-100 bg-white/60 p-4 shadow-inner">
            <div className="slider-track w-[200%]">
              {[...categories, ...categories].map((cat, idx) => (
                <div
                  key={idx}
                  className="min-w-[220px] p-4 rounded-lg bg-white shadow-sm card-hover"
                  style={{ flex: "0 0 auto" }}
                >
                  <div className="h-28 rounded-md overflow-hidden">
                    <img src={cat.img} alt={cat.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-3">
                    <div className="text-xl font-semibold text-green-700">{cat.title}</div>
                    <p className="text-sm text-gray-600">{cat.desc}</p>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button className="px-3 py-1 rounded-md border border-green-200 text-sm hover:bg-green-50">Explore</button>
                    <button className="px-3 py-1 rounded-md bg-green-700 text-white text-sm hover:bg-green-800">Buy</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="py-12 bg-green-50">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold text-green-700">Stay updated</h3>
            <p className="text-sm text-gray-700">Get market tips, seasonal guides, and exclusive offers.</p>
          </div>
          <form action="https://formspree.io/f/maypzelq" method="POST" className="w-full md:w-auto flex gap-2">
            <input
              name="email"
              type="email"
              required
              placeholder="Your email"
              className="px-4 py-2 rounded-md border border-gray-300 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <button type="submit" className="px-4 py-2 rounded-md bg-green-700 text-white font-semibold hover:bg-green-800 transition">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl font-bold text-green-700">About AgriPulse</h3>
            <p className="mt-4 text-gray-700">
              We are a small team committed to bringing affordable agricultural inputs and digital guidance to growers. From curated seeds to organic soil enhancers, our goal is to support sustainable livelihoods.
            </p>
            <ul className="mt-4 list-disc list-inside text-gray-700">
              <li>Quality-assured seeds & inputs</li>
              <li>Localized growing guides</li>
              <li>Fair pricing & cooperative support</li>
            </ul>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://efarmingodisha.wordpress.com/wp-content/uploads/2019/12/efarming1.jpg?w=640"
              alt="farmers"
              className="w-full h-72 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-green-100">
        <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-bold text-lg text-green-700">AgriPulse</h4>
            <p className="text-sm text-gray-700 mt-2">
              Connecting growers to quality inputs and knowledge.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-green-700">Get in touch</h5>
            <form id="contact" action="https://formspree.io/f/maypzelq" method="POST" className="mt-3 flex flex-col gap-2">
              <input name="name" placeholder="Your name" className="px-3 py-2 rounded-md border border-gray-300" />
              <input name="email" placeholder="Email" className="px-3 py-2 rounded-md border border-gray-300" />
              <textarea name="message" placeholder="Message" className="px-3 py-2 rounded-md border border-gray-300" />
              <button type="submit" className="mt-2 px-4 py-2 rounded-md bg-green-700 text-white hover:bg-green-800 transition">Send</button>
            </form>
          </div>

          <div>
            <h5 className="font-semibold text-green-700">Follow</h5>
            <div className="mt-3 flex gap-3 items-center">
              <a href="#" className="p-2 rounded-full hover:bg-green-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-700" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.2A4.8 4.8 0 1016.8 13 4.8 4.8 0 0012 8.2zM18.5 6a1.1 1.1 0 11-1.1-1.1A1.1 1.1 0 0118.5 6z" /></svg>
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-green-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-700" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8.98h5v14H0v-14zM8.98 8.98h4.8v1.9h.1c.67-1.28 2.3-2.63 4.73-2.63 5.05 0 5.98 3.33 5.98 7.66v8.07h-5v-7.16c0-1.71 0-3.92-2.39-3.92-2.39 0-2.76 1.87-2.76 3.79v7.29h-5v-14z" /></svg>
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-green-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-700" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2v-2.9h2.2V9.4c0-2.2 1.3-3.4 3.3-3.4.95 0 1.95.17 1.95.17v2.2h-1.12c-1.1 0-1.45.69-1.45 1.4v1.68h2.48l-.4 2.9h-2.08v7A10 10 0 0022 12z" /></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-green-100 text-center text-sm py-4 text-gray-600">
          © {new Date().getFullYear()} AgriEcom — All rights reserved
        </div>
      </footer>
    </div>
  );
}