import { Mail, Phone, MapPin, Leaf, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

import Logo from '../assets/Images/Greenlogo.png'

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo & Branding */}
        <div className="flex flex-col space-y-4">
          <Link to="/" className="w-32">
            <img src={Logo} alt="Logo" className="w-full h-auto" />
          </Link>
          <p className="text-gray-300 text-sm">
            Freshly scooped natural ice cream—crafted with passion, flavor, and honesty.
          </p>
          <p className="flex items-center gap-1 text-green-400 text-xs font-semibold">
            <Leaf size={16} /> 100% Natural • No Preservatives
          </p>
        </div>

        {/* Quick Links */}
       <div>
  <h3 className="text-green-400 font-semibold mb-4">Explore</h3>
  <ul className="space-y-2 text-gray-300 text-sm">
    <li><a href="https://www.thancosnatural.com/about-us/" target="_blank" rel="noopener noreferrer" className="hover:text-white">About Us</a></li>
    <li><a href="https://www.thancosnatural.com/flavours/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Our Flavors</a></li>
    <li><a href="https://www.thancosnatural.com/stores/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Stores</a></li>
    <li><a href="https://www.thancosnatural.com/franchisee/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Franchisee</a></li>
    <li><a href="https://www.thancosnatural.com/find-us/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Contact Us</a></li>
  </ul>
</div>


        {/* Contact Info */}
        <div>
          <h3 className="text-green-400 font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="flex items-start gap-2"><Phone size={16} /> +91-9916502035</li>
            <li className="flex items-start gap-2"><Mail size={16} /> support@thancosnatural.com</li>
            <li className="flex items-start gap-2"><MapPin size={16} /> 1052/20, Mehta Industrial Estate, Gokul 1st Stg, Bengaluru 560054</li>
          </ul>
        </div>

        {/* Social & Subscribe */}
        <div>
          <h3 className="text-green-400 font-semibold mb-4">Follow & Subscribe</h3>
          <p className="text-gray-300 mb-4 text-sm">Connect with us for updates & stories</p>

          <div className="flex space-x-4 mb-6 text-green-400">
            <a href="https://www.facebook.com/share/1Fuva3pdMv/" aria-label="Facebook"><Facebook className="hover:text-white" size={20} /></a>
            <a href="https://www.instagram.com/thancos_natural_official/?igsh=dW9nbmtzYXR6NTh2" aria-label="Instagram"><Instagram className="hover:text-white" size={20} /></a>
          </div>

          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 flex-1 rounded bg-gray-800 placeholder-gray-500 text-white focus:outline-none"
            />
            <button type="submit" className="px-4 py-2 bg-green-400 text-black rounded font-semibold hover:bg-green-500 transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-xs">
        <p>© {new Date().getFullYear()} Thanco’s Natural Ice Cream. All rights reserved.</p>
        <p className="mt-1">Crafted with 💛 in India</p>
      </div>
    </footer>
  );
}
