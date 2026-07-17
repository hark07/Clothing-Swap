import { Link } from "react-router-dom";
import { Globe, Mail, Phone, MapPin, Heart } from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-950 to-black text-gray-300 mt-5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo */}

          <div>
            <h2 className="text-4xl font-extrabold tracking-wide">
              <span className="text-emerald-500">Clothing</span>
              <span className="text-white">Swap</span>
            </h2>

            <p className="mt-5 leading-7 text-gray-400">
              Exchange clothes, reduce fashion waste, and help build a
              sustainable future. Join our community and give your wardrobe a
              second life.
            </p>

            <div className="flex gap-4 mt-8">
              <a
                href="#"
                className="w-11 h-11 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-gray-800 hover:bg-pink-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-gray-800 hover:bg-blue-700 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-gray-800 hover:bg-gray-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <FaGithub size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="text-xl font-semibold text-white mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4">
              <li>
                <div className="hover:text-emerald-400 transition">Home</div>
              </li>

              <li>
                <div className="hover:text-emerald-400 transition">
                  Browse Items
                </div>
              </li>

              <li>
                <div className="hover:text-emerald-400 transition">
                  Dashboard
                </div>
              </li>

              <li>
                <div className="hover:text-emerald-400 transition">
                  Add Item
                </div>
              </li>
            </ul>
          </div>

          {/* Support */}

          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Support</h3>

            <ul className="space-y-4">
              <li>
                <div className="hover:text-emerald-400 transition">
                  About Us
                </div>
              </li>

              <li>
                <div className="hover:text-emerald-400 transition">Contact</div>
              </li>

              <li>
                <div className="hover:text-emerald-400 transition">
                  Privacy Policy
                </div>
              </li>

              <li>
                <div className="hover:text-emerald-400 transition">
                  Terms & Conditions
                </div>
              </li>
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-xl font-semibold text-white mb-6">
              Contact Us
            </h3>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Mail className="text-emerald-500" size={18} />

                <span>support@clothingswap.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-emerald-500" size={18} />

                <span>+977-9862460586</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-emerald-500" size={18} />

                <span>Kathmandu, Nepal</span>
              </div>

              <div className="flex items-center gap-3">
                <Globe className="text-emerald-500" size={18} />

                <span>www.clothingswap.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="border-t border-gray-800 mt-14 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} ClothingSwap. All Rights Reserved.
          </p>

          <p className="flex items-center gap-2 text-sm text-gray-500">
            Made with
            <Heart size={16} className="text-red-500 fill-red-500" />
            in Nepal
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
