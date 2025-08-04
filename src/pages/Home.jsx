"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import ProductCard from "../components/ProductCard"
import TestimonialCard from "../components/TestimonialCard"

const Home = ({ navigateTo }) => {
  const featuredProductsRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])

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

  // Sample featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "Marble Ganesh Statue",
      image: "/placeholder.svg?height=300&width=250",
      shortDescription: "Beautifully crafted white marble Ganesh statue with intricate detailing.",
      price: "12,500",
      isNew: true,
    },
    {
      id: 2,
      name: "Radha Krishna Idol",
      image: "/placeholder.svg?height=300&width=250",
      shortDescription: "Elegant Radha Krishna marble statue, perfect for home temples.",
      price: "18,900",
      isNew: false,
    },
    {
      id: 3,
      name: "Peacock Sankh",
      image: "/placeholder.svg?height=300&width=250",
      shortDescription: "Intricately carved marble sankh with peacock design for sacred rituals.",
      price: "8,500",
      isNew: true,
    },
    {
      id: 4,
      name: "Custom Marble Bust",
      image: "/placeholder.svg?height=300&width=250",
      shortDescription: "Personalized marble busts crafted with precision and artistry.",
      price: null,
      isNew: false,
    },
  ]

  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Sharma",
      location: "Delhi, India",
      rating: 5,
      text: "The craftsmanship of the marble Ganesh statue I purchased is exceptional. The attention to detail is remarkable, and it has become the centerpiece of my home temple. Highly recommended!",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "Priya Patel",
      location: "Mumbai, India",
      rating: 5,
      text: "I ordered a custom marble bust of my grandfather, and the result exceeded my expectations. The likeness is uncanny, and the quality of the marble is superb. A treasured family heirloom now.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      name: "Amit Verma",
      location: "Jabalpur, India",
      rating: 5,
      text: "Vishnu Hast Kala Kendra has the best collection of marble statues I have ever seen. The Radha Krishna idol I purchased is simply divine. The service was excellent, and delivery was prompt.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  // Scroll to featured products section
  const scrollToProducts = () => {
    featuredProductsRef.current?.scrollIntoView({ behavior: "smooth" })
  }

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

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
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
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-xl"
          animate={{
            x: [0, 120, 0],
            y: [0, -80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 5,
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center text-center text-white relative overflow-hidden">
        {/* Animated Background */}
        <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
          <img
            src="https://res.cloudinary.com/bazeercloud/image/upload/v1754207183/ChatGPT_Image_Aug_3_2025_01_14_13_PM_bfkiko.png"
            alt="Hero Background"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.4) contrast(1.1)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
        </motion.div>

        {/* Particle Effect */}
        <div className="absolute inset-0 z-5">
          {[...Array(20)].map((_, i) => (
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
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              VISHNU HAST KALA KENDRA
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90 drop-shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Welcome to our shop where we shape your{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent font-semibold">
                Imagination To Reality
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col sm:flex-row justify-center gap-6"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                }}
                whileTap={{ scale: 0.95 }}
                className="backdrop-blur-md bg-gradient-to-r from-blue-500/80 to-purple-600/80 text-white font-semibold py-4 px-10 rounded-full text-lg border border-white/30 shadow-xl transition-all duration-300"
                onClick={() => navigateTo("products")}
              >
                <span className="flex items-center gap-2">
                  Explore Products
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                className="backdrop-blur-md bg-white/10 text-white font-semibold py-4 px-10 rounded-full text-lg border border-white/30 hover:bg-white/20 transition-all duration-300 shadow-xl"
                onClick={scrollToProducts}
              >
                Featured Items
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
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
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="backdrop-blur-sm bg-white/70 border border-white/20 rounded-2xl p-8 shadow-xl"
                whileHover={{ scale: 1.02, shadow: "0 25px 50px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <motion.h2
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6"
                  variants={itemVariants}
                >
                  About Vishnu Hast Kala Kendra
                </motion.h2>
                <motion.p className="text-gray-600 mb-6 text-lg leading-relaxed" variants={itemVariants}>
                  Vishnu Hastkala Kendra is a premier marble moorti (idol) and idol manufacturer located in Bhedaghat,
                  Jabalpur, Madhya Pradesh, India. We specialize in creating exquisite marble sculptures that embody
                  spiritual devotion and artistic excellence.
                </motion.p>
                <motion.p className="text-gray-600 mb-8 text-lg leading-relaxed" variants={itemVariants}>
                  With years of experience and a team of skilled artisans, we create masterpieces that blend traditional
                  craftsmanship with contemporary aesthetics, ensuring each piece tells a unique story.
                </motion.p>
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                  onClick={() => navigateTo("about")}
                >
                  Learn More About Us
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              variants={floatingVariants}
              animate="animate"
            >
              <div className="relative">
                <motion.div
                  className="backdrop-blur-sm bg-white/30 border border-white/20 rounded-3xl p-4 shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="https://res.cloudinary.com/bazeercloud/image/upload/v1751267519/WhatsApp_Image_2025-06-30_at_12.28.19_PM_sowywf.jpg"
                    alt="Artisan crafting marble statue"
                    className="rounded-2xl w-full object-cover shadow-xl"
                    loading="lazy"
                  />
                </motion.div>
                <motion.div
                  className="absolute -bottom-6 -right-6 backdrop-blur-md bg-white/80 border border-white/30 p-6 rounded-2xl shadow-2xl"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-blue-600 font-bold text-xl">Since 1985</p>
                  <p className="text-gray-600 font-medium">Crafting Excellence</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section ref={featuredProductsRef} className="py-20 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
              variants={itemVariants}
            >
              Featured Products
            </motion.h2>
            <motion.p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed" variants={itemVariants}>
              Discover the timeless beauty of marble with our exquisite collection of statues. Each piece is
              meticulously crafted to capture the essence of artistry and elegance.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="backdrop-blur-sm bg-white/70 border border-white/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <ProductCard product={product} navigateTo={navigateTo} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-10 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
              onClick={() => navigateTo("products")}
            >
              View All Products
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
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
        </div>

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
              Our Services
            </motion.h2>
            <motion.p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed" variants={itemVariants}>
              We offer a wide range of services to meet your needs. From custom marble statues to stone carvings, we
              have you covered with excellence and precision.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                ),
                title: "Custom Marble Statues",
                description:
                  "We create custom marble statues tailored to your specific requirements. Our skilled artisans bring your vision to life with precision and artistry.",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                ),
                title: "Marble Contractor Services",
                description:
                  "We provide comprehensive marble contractor services for residential and commercial projects. From selection to installation, we ensure a seamless experience.",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                ),
                title: "Restoration & Repair",
                description:
                  "We offer expert restoration and repair services for damaged marble statues and artifacts. Our team can restore your precious pieces to their original glory.",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
                }}
                className="backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-2xl shadow-xl hover:bg-white/15 transition-all duration-300"
              >
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-6 shadow-lg"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {service.icon}
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
              variants={itemVariants}
            >
              What Our Customers Say
            </motion.h2>
            <motion.p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed" variants={itemVariants}>
              Don't just take our word for it. Here's what our satisfied customers have to say about our products and
              services.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="backdrop-blur-sm bg-white/70 border border-white/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
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
              Ready to Transform Your Space?
            </motion.h2>
            <motion.p
              className="text-xl mb-10 max-w-2xl mx-auto text-white/90 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Contact us today to discuss your requirements and bring your vision to life with our expert craftsmanship
              and dedication to excellence.
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
              <span className="flex items-center gap-3">
                Contact Us Now
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
