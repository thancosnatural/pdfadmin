import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Logo =
  "https://thancos.s3.ap-southeast-2.amazonaws.com/logo.png";

const navLinks = [
  { label: "Home", path: "/" },

];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerTranslateY, setHeaderTranslateY] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [flavoursOpen, setFlavoursOpen] = useState(false);
  const [mobileFlavoursOpen, setMobileFlavoursOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const introText = "Welcome to Thanc's Natural Ice Cream";
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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY) {
        setShowTopBar(true);
        setHeaderTranslateY(0);
      } else {
        setShowTopBar(false);
        setHeaderTranslateY(-32);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
            {/* Logo animation */}
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

            {/* Animated intro text */}
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



          <motion.header
            className="w-full backdrop-blur bg-white/40 shadow"
            animate={{ y: headerTranslateY }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
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
                      className="w-full h-auto object-contain"
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
                            ? "text-yellow-500"
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

                    {/* Flavours + mobile dropdown */}
                    <motion.div
                      className="flex flex-col"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <button
                        onClick={() =>
                          setMobileFlavoursOpen(!mobileFlavoursOpen)
                        }
                        className="flex justify-between items-center font-medium px-3 py-2 rounded transition hover:bg-yellow-100"
                      >
                        <span
                          className={
                            location.pathname.startsWith("/flavours")
                              ? "text-yellow-500"
                              : "text-black"
                          }
                        >
                          Flavours
                        </span>
                        <motion.svg
                          className="h-4 w-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          initial={false}
                          animate={{
                            rotate: mobileFlavoursOpen ? 180 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </motion.svg>
                      </button>
                      <AnimatePresence>
                        {mobileFlavoursOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="ml-4 mt-2 flex flex-col space-y-2"
                          >
                            <Link
                              to="/flavours"
                              onClick={toggleMenu}
                              className="text-black text-sm px-3 py-2 rounded transition hover:bg-yellow-100"
                            >
                              All Flavours
                            </Link>
                            <Link
                              to="/flavours/sundaes"
                              onClick={toggleMenu}
                              className="text-black text-sm px-3 py-2 rounded transition hover:bg-yellow-100"
                            >
                              Sundaes
                            </Link>
                            <Link
                              to="/flavours/stones"
                              onClick={toggleMenu}
                              className="text-black text-sm px-3 py-2 rounded transition hover:bg-yellow-100"
                            >
                              Stones
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
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
