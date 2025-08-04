"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Set active page based on route
  const currentPage = location.pathname.replace("/", "") || "home"

  const navItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "about", label: "About Us", path: "/about" },
    { id: "products", label: "Products", path: "/products" },
    { id: "blog", label: "Blog", path: "/blog" },
    { id: "contact", label: "Contact", path: "/contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-md bg-white/20 border-b border-white/20 shadow-lg py-2"
          : "backdrop-blur-sm bg-white/10 border-b border-white/10 py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/" className="font-bold text-2xl md:text-3xl text-white drop-shadow-lg">
              Vishnu Hast Kala
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <motion.div key={item.id} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to={item.path}
                  className={`font-medium transition-colors duration-200 ${
                    currentPage === item.id
                      ? "text-yellow-300 drop-shadow-md"
                      : "text-white/90 hover:text-yellow-300 drop-shadow-sm"
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/dashboard"
                className="font-medium px-4 py-2 rounded-full backdrop-blur-md bg-white/20 text-white border border-white/30 hover:bg-white/30 transition-all duration-200 drop-shadow-lg"
              >
                Dashboard
              </Link>
            </motion.div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white/90 hover:text-white transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 backdrop-blur-md bg-white/20 border border-white/20 rounded-lg shadow-xl overflow-hidden"
          >
            <div className="flex flex-col py-2">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-3 px-4 text-left transition-colors duration-200 ${
                    currentPage === item.id
                      ? "text-yellow-300 font-medium bg-white/10"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 px-4 text-left bg-white/20 text-white mt-2 mx-2 rounded-md border border-white/30 hover:bg-white/30 transition-all duration-200"
              >
                Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}

export default Navbar
