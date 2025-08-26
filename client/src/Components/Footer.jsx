import { assets, footerLinks } from "../assets/assets";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-600 text-white px-6 md:px-16 lg:px-24 xl:px-32 mt-24">
      
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-12 border-b border-white/20">
        
        {/* Logo + Tagline */}
        <div>
          <img className="w-36 md:w-40" src={assets.logo2} alt="logo" />
          <p className="max-w-[420px] mt-6 text-sm md:text-base leading-relaxed">
            “Fresh from the farm, delivered with care — simple, affordable, reliable.”
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <a href="#" className="hover:text-yellow-300 transition">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="hover:text-yellow-300 transition">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="hover:text-yellow-300 transition">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="hover:text-yellow-300 transition">
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-between w-full md:w-[55%] gap-8">
          {footerLinks.map((section, index) => (
            <div key={index} className="min-w-[120px]">
              <h3 className="font-semibold text-base md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      className="hover:text-yellow-300 transition-colors duration-200"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="py-6 flex flex-col md:flex-row items-center justify-between text-sm md:text-base">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">GrainPluse</span> — All Rights Reserved.
        </p>
        <p className="mt-3 md:mt-0">
          Made with <span className="text-red-400">♥</span> for Freshness
        </p>
      </div>
    </footer>
  );
};

export default Footer;
