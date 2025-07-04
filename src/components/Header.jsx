import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from '../assets/Images/Greenlogo.png';
import { IoHomeOutline } from "react-icons/io5";

const navLinks = [
  { label: <IoHomeOutline size={25} />, path: "/" },
  // Add more nav items here if needed
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const introText = "Quick Order List";
  const words = introText.split(" ");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Intro overlay */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[100]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <motion.img
              src={Logo}
              alt="Thancos Natural Logo"
              layoutId="logo"
              initial={{ scale: 3, opacity: 1 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1,
                ease: [0.17, 0.67, 0.83, 0.67],
              }}
              className="w-32 h-auto md:w-48"
            />

            <motion.div
              className="mt-6 flex flex-wrap justify-center text-center"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  className="text-xl md:text-3xl font-semibold text-gray-800 mx-1"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showIntro && (
        <motion.div
          className="fixed top-0 left-0 w-full z-[60]"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.header className="w-full backdrop-blur bg-white/40 shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16 md:h-20">
                {/* Logo */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 md:w-24"
                >
                  <Link to="/">
                    <motion.img
                      src={Logo}
                      alt="Thancos Natural Logo"
                      layoutId="logo"
                      className="w-12 md:w-16 h-auto object-contain"
                    />
                  </Link>
                </motion.div>

                {/* Desktop navigation */}
                <nav className="hidden md:flex gap-6 items-center relative">
                  {navLinks.map((nav, idx) => (
                    <motion.div
                      key={nav.label}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.3 + idx * 0.1,
                        duration: 0.4,
                      }}
                    >
                      <Link
                        to={nav.path}
                        className={`text-[18px] font-semibold transition duration-300 ${
                          location.pathname === nav.path
                            ? "text-gray-500"
                            : "text-black hover:text-yellow-500"
                        }`}
                      >
                        {nav.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Hamburger menu for mobile */}
                <motion.div
                  className="md:hidden flex items-center"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <button
                    onClick={toggleMenu}
                    className="text-black hover:text-yellow-500 focus:outline-none"
                  >
                    <svg
                      className="h-7 w-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {menuOpen ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      )}
                    </svg>
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  className="md:hidden px-4 pb-6 pt-2 bg-white shadow-lg"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <nav className="flex flex-col space-y-3">
                    {navLinks.map((nav) => (
                      <motion.div
                        key={nav.label}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Link
                          to={nav.path}
                          onClick={toggleMenu}
                          className={`font-medium px-3 py-2 rounded transition ${
                            location.pathname === nav.path
                              ? "text-yellow-500"
                              : "text-black hover:bg-yellow-100"
                          }`}
                        >
                          {nav.label}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.header>
        </motion.div>
      )}
    </>
  );
};

export default Header;
