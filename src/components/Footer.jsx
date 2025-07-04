import { useState } from 'react';
import axios from 'axios';
import { Mail, Phone, MapPin, Leaf, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Images/Greenlogo.png';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage({ type: 'error', text: 'Please enter an email.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await axios.post('https://pdfserver-h9aj.onrender.com/api/subscribe', { email });

      setMessage({ type: 'success', text: res.data.message || 'Thanks for subscribing!' });
      setEmail('');
    } catch (error) {
      console.error(error);
      let errorMsg = 'Something went wrong. Please try again.';

      if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      }

      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

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

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="px-3 py-2 flex-1 rounded bg-gray-800 placeholder-gray-500 text-white focus:outline-none"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 bg-green-400 text-black rounded font-semibold hover:bg-green-500 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          {message && (
            <p
              className={`mt-3 text-sm ${
                message.type === 'success' ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {message.text}
            </p>
          )}
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
