"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Search, Filter, Package, Truck, Shield, Frown } from "lucide-react"

const Products = ({ navigateTo }) => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Product categories
  const categories = [
    { id: "all", name: "All Products", count: 12 },
    { id: "statues", name: "Marble Statues", count: 5 },
    { id: "idols", name: "Stone Idols", count: 1 },
    { id: "busts", name: "Custom Busts", count: 2 },
    { id: "religious", name: "Religious Items", count: 3 },
    { id: "handicrafts", name: "Handicrafts", count: 1 },
  ]

  // Sample products data
  const products = [
    {
      id: 1,
      name: "Marble Ganesh Statue",
      image: "/placeholder.svg?height=400&width=400",
      shortDescription: "Beautifully crafted white marble Ganesh statue with intricate detailing.",
      price: "12,500",
      category: "statues",
      isNew: true,
      rating: 4.8,
      reviews: 24,
    },
    {
      id: 2,
      name: "Radha Krishna Idol",
      image: "/placeholder.svg?height=400&width=400",
      shortDescription: "Elegant Radha Krishna marble statue, perfect for home temples.",
      price: "18,900",
      category: "statues",
      isNew: false,
      rating: 4.9,
      reviews: 18,
    },
    {
      id: 3,
      name: "Peacock Sankh",
      image: "/placeholder.svg?height=400&width=400",
      shortDescription: "Intricately carved marble sankh with peacock design for sacred rituals.",
      price: "8,500",
      category: "religious",
      isNew: true,
      rating: 4.7,
      reviews: 12,
    },
    {
      id: 4,
      name: "Custom Marble Bust",
      image: "/placeholder.svg?height=400&width=400",
      shortDescription: "Personalized marble busts crafted with precision and artistry.",
      price: null,
      category: "busts",
      isNew: false,
      rating: 5.0,
      reviews: 8,
    },
    {
      id: 5,
      name: "Lord Shiva Statue",
      image: "/placeholder.svg?height=400&width=400",
      shortDescription: "Majestic Lord Shiva statue carved from high-quality white marble.",
      price: "22,500",
      category: "statues",
      isNew: false,
      rating: 4.9,
      reviews: 31,
    },
    {
      id: 6,
      name: "Marble Lakshmi Statue",
      image: "/placeholder.svg?height=400&width=400",
      shortDescription: "Beautiful Goddess Lakshmi statue with gold-painted accents.",
      price: "15,800",
      category: "statues",
      isNew: true,
      rating: 4.8,
      reviews: 15,
    },
    {
      id: 7,
      name: "Stone Nandi Bull",
      image: "/placeholder.svg?height=400&width=400",
      shortDescription: "Traditional Nandi Bull carved from durable stone, ideal for temples.",
      price: "14,200",
      category: "idols",
      isNew: false,
      rating: 4.6,
      reviews: 9,
    },
    {
      id: 8,
      name: "Marble Pooja Thali",
      image: "/placeholder.svg?height=400&width=400",
      shortDescription: "Elegant marble pooja thali with intricate designs for daily rituals.",
      price: "3,500",
      category: "religious",
      isNew: false,
      rating: 4.5,
      reviews: 22,
    },
    {
      id: 9,
      name: "Decorative Elephant Pair",
      image: "/placeholder.svg?height=400&width=400",
      shortDescription: "Pair of decorative marble elephants, perfect for home décor.",
      price: "7,800",
      category: "handicrafts",
      isNew: true,
      rating: 4.7,
      reviews: 14,
    },
    {
      id: 10,
      name: "Marble Saraswati Idol",
      image: "/placeholder.svg?height=400&width=400",
      shortDescription: "Exquisite Goddess Saraswati statue with detailed features.",
      price: "16,500",
      category: "statues",
      isNew: false,
      rating: 4.8,
      reviews: 19,
    },
    {
      id: 11,
      name: "Custom Family Portrait",
      image: "/placeholder.svg?height=400&width=400",
      shortDescription: "Custom marble relief portrait of your family, hand-carved by our artisans.",
      price: null,
      category: "busts",
      isNew: true,
      rating: 5.0,
      reviews: 6,
    },
    {
      id: 12,
      name: "Marble Diya Stand",
      image: "/placeholder.svg?height=400&width=400",
      shortDescription: "Beautifully designed marble diya stand for festive occasions.",
      price: "2,800",
      category: "religious",
      isNew: false,
      rating: 4.4,
      reviews: 17,
    },
  ]

  // Filter products based on category and search query
  useEffect(() => {
    let result = products

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((product) => product.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) || product.shortDescription.toLowerCase().includes(query),
      )
    }

    setFilteredProducts(result)
  }, [selectedCategory, searchQuery])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-r from-pink-400/20 to-yellow-400/20 rounded-full blur-xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center text-white overflow-hidden">
        {/* Animated Background */}
        <motion.div className="absolute inset-0 z-0" style={{ y }}>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        </motion.div>

        {/* Particle Effect */}
        <div className="absolute inset-0 z-5">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <motion.div
          className="container mx-auto px-4 relative z-10"
          style={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
        >
          <motion.div
            className="max-w-4xl mx-auto text-center backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Our Products
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-white/90 drop-shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Discover our exquisite collection of{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent font-semibold">
                handcrafted marble and stone creations
              </span>
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-50">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Search and Filter */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="backdrop-blur-sm bg-white/70 border border-white/20 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                {/* Categories */}
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category.id
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                          : "backdrop-blur-sm bg-white/50 text-gray-700 hover:bg-white/80 border border-white/30"
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        {category.name}
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            selectedCategory === category.id ? "bg-white/20" : "bg-gray-200"
                          }`}
                        >
                          {category.count}
                        </span>
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* Search */}
                <div className="w-full lg:w-auto">
                  <div className="relative">
                    <motion.input
                      type="text"
                      placeholder="Search products..."
                      className="w-full lg:w-80 px-6 py-3 pl-12 backdrop-blur-sm bg-white/50 border border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/80 transition-all duration-300"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      whileFocus={{ scale: 1.02 }}
                    />
                    <Search className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  className="backdrop-blur-sm bg-white/70 border border-white/20 rounded-2xl shadow-xl overflow-hidden"
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={product.image || "/placeholder.svg?height=400&width=400&query=marble%20product"}
                      alt={product.name}
                      className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                      loading="lazy"
                    />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.isNew && (
                        <motion.span
                          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        >
                          New Arrival
                        </motion.span>
                      )}
                      {!product.price && (
                        <motion.span
                          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        >
                          Custom
                        </motion.span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <motion.h3
                      className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors duration-200"
                      whileHover={{ x: 5 }}
                    >
                      {product.name}
                    </motion.h3>

                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.shortDescription}</p>

                    {/* Rating */}
                    {product.rating && (
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {product.rating} ({product.reviews} reviews)
                        </span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center justify-between mb-6">
                      {product.price ? (
                        <motion.p
                          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center"
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className="text-blue-600 mr-1">₹</span>
                          {product.price}
                        </motion.p>
                      ) : (
                        <motion.p
                          className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                          whileHover={{ scale: 1.05 }}
                        >
                          Price on Request
                        </motion.p>
                      )}
                    </div>

                    {/* Action Button */}
                    <motion.button
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                      onClick={() => navigateTo(`products`)}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        View Details
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="backdrop-blur-sm bg-white/70 border border-white/20 rounded-2xl p-12 shadow-xl max-w-md mx-auto"
                whileHover={{ scale: 1.02 }}
              >
                <Frown className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                <motion.button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-6 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  onClick={() => {
                    setSelectedCategory("all")
                    setSearchQuery("")
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear filters
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Custom Order Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="backdrop-blur-sm bg-white/70 border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2">
                <motion.div
                  className="relative h-full min-h-[400px]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/placeholder.svg?height=500&width=600"
                    alt="Custom marble statue"
                    className="w-full h-full object-cover rounded-l-3xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 rounded-l-3xl" />
                </motion.div>
              </div>
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                <motion.h2
                  className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Can't Find What You're Looking For?
                </motion.h2>
                <motion.p
                  className="text-gray-600 mb-6 text-lg leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  We specialize in custom orders tailored to your specific requirements. Whether you need a particular
                  deity statue, a custom bust, or a unique marble artifact, our skilled artisans can bring your vision
                  to life.
                </motion.p>
                <motion.p
                  className="text-gray-600 mb-8 text-lg leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Contact us today to discuss your custom order requirements and get a personalized quote.
                </motion.p>
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg self-start"
                  onClick={() => navigateTo("contact")}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <span className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Request Custom Order
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Shipping & Care Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)",
              "linear-gradient(45deg, rgba(147, 51, 234, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)",
              "linear-gradient(45deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Shipping & Product Care
            </motion.h2>
            <motion.p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed" variants={itemVariants}>
              Information about our shipping process and how to care for your marble products
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Shipping Information */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
              }}
              className="backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-2xl shadow-xl"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full mr-4 shadow-lg"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Truck className="h-6 w-6 text-white" />
                </motion.div>
                Shipping Information
              </h3>
              <ul className="space-y-4 text-gray-300">
                {[
                  "We ship our products across India and internationally.",
                  "Each product is carefully packed with protective materials to ensure safe delivery.",
                  "Domestic shipping typically takes 5-7 business days, while international shipping may take 10-15 business days.",
                  "For large or custom orders, shipping times may vary. We will provide you with a specific timeline during the ordering process.",
                  "Shipping costs are calculated based on the product weight, dimensions, and delivery location.",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <motion.div
                      className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0"
                      whileHover={{ scale: 1.2 }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </motion.div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Product Care */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
              }}
              className="backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-2xl shadow-xl"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full mr-4 shadow-lg"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Shield className="h-6 w-6 text-white" />
                </motion.div>
                Product Care
              </h3>
              <ul className="space-y-4 text-gray-300">
                {[
                  "Clean your marble products gently with a soft, damp cloth. Avoid using harsh chemicals or abrasive cleaners.",
                  "For deeper cleaning, use a mild soap solution and rinse thoroughly with water.",
                  "Keep marble products away from acidic substances like lemon juice, vinegar, or tomato sauce, as they can etch the surface.",
                  "Apply a marble sealer once a year to protect the surface from stains and moisture.",
                  "Handle your marble products with care to avoid chips or cracks. Use both hands when moving them.",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <motion.div
                      className="bg-purple-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0"
                      whileHover={{ scale: 1.2 }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </motion.div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-purple-600/50"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(59, 130, 246, 0.5) 0%, rgba(147, 51, 234, 0.5) 100%)",
              "linear-gradient(45deg, rgba(147, 51, 234, 0.5) 0%, rgba(59, 130, 246, 0.5) 100%)",
              "linear-gradient(45deg, rgba(59, 130, 246, 0.5) 0%, rgba(147, 51, 234, 0.5) 100%)",
            ],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-12 shadow-2xl max-w-4xl mx-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Have Questions About Our Products?
            </motion.h2>
            <motion.p
              className="text-xl mb-10 max-w-2xl mx-auto text-white/90 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our team is here to help you find the perfect piece for your home, temple, or special occasion.
            </motion.p>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              className="backdrop-blur-md bg-white/10 text-white font-semibold py-4 px-12 rounded-full text-xl border border-white/30 hover:bg-white/20 transition-all duration-300 shadow-xl"
              onClick={() => navigateTo("contact")}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Contact Us Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Products
