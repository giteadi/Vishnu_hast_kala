"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Clock,
  MapPin,
  Mail,
  Phone,
  PlusCircle,
  Edit,
  Trash2,
  MessageSquare,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const navigate = useNavigate()
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

  const navigateTo = (path) => {
    navigate(`/${path}`)
  }

  // Sample data for dashboard
  const stats = [
    { icon: Users, value: "1,200+", label: "Happy Customers" },
    { icon: Package, value: "500+", label: "Products Sold" },
    { icon: ShoppingCart, value: "150+", label: "New Orders" },
    { icon: DollarSign, value: "₹5M+", label: "Revenue Generated" },
  ]

  const recentOrders = [
    { id: 1, product: "Marble Ganesh Statue", customer: "Rahul Sharma", status: "Delivered", amount: "₹12,500" },
    { id: 2, product: "Radha Krishna Idol", customer: "Priya Singh", status: "Processing", amount: "₹18,900" },
    { id: 3, product: "Peacock Sankh", customer: "Amit Verma", status: "Shipped", amount: "₹8,500" },
    { id: 4, product: "Custom Marble Bust", customer: "Sneha Gupta", status: "Pending", amount: "Price on Request" },
    { id: 5, product: "Lord Shiva Statue", customer: "Deepak Kumar", status: "Delivered", amount: "₹22,500" },
  ]

  const topProducts = [
    { id: 1, name: "Marble Ganesh Statue", sales: "120 units" },
    { id: 2, name: "Radha Krishna Idol", sales: "95 units" },
    { id: 3, name: "Peacock Sankh", sales: "70 units" },
    { id: 4, name: "Marble Lakshmi Statue", sales: "60 units" },
    { id: 5, name: "Lord Shiva Statue", sales: "55 units" },
  ]

  const productsData = [
    { id: 1, name: "Marble Ganesh Statue", category: "Statues", stock: 15, price: "₹12,500" },
    { id: 2, name: "Radha Krishna Idol", category: "Statues", stock: 10, price: "₹18,900" },
    { id: 3, name: "Peacock Sankh", category: "Religious", stock: 20, price: "₹8,500" },
    { id: 4, name: "Custom Marble Bust", category: "Busts", stock: "N/A", price: "On Request" },
    { id: 5, name: "Lord Shiva Statue", category: "Statues", stock: 8, price: "₹22,500" },
  ]

  const blogPosts = [
    { id: 1, title: "The Art of Marble Carving", author: "Admin", date: "2025-07-20", status: "Published" },
    { id: 2, title: "Choosing the Perfect Deity Idol", author: "Admin", date: "2025-07-15", status: "Published" },
    { id: 3, title: "Customizing Your Marble Masterpiece", author: "Admin", date: "2025-07-10", status: "Draft" },
  ]

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
              Admin Dashboard
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-white/90 drop-shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Overview of your{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent font-semibold">
                business operations
              </span>
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  className="backdrop-blur-sm bg-white/70 border border-white/20 p-6 rounded-2xl shadow-xl flex flex-col items-center text-center"
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                >
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full mb-4 shadow-lg"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 text-lg">{stat.label}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Recent Orders & Top Products Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <motion.div
              className="backdrop-blur-sm bg-white/70 border border-white/20 p-8 rounded-2xl shadow-xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.01, boxShadow: "0 25px 50px rgba(0,0,0,0.1)" }}
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6 flex items-center">
                <Clock className="h-7 w-7 text-blue-600 mr-3" />
                Recent Orders
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white/50 rounded-lg overflow-hidden">
                  <thead className="bg-white/80">
                    <tr className="border-b border-white/30">
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Product</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Customer</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-white/20 last:border-b-0 hover:bg-white/60">
                        <td className="py-3 px-4 text-gray-800">{order.product}</td>
                        <td className="py-3 px-4 text-gray-800">{order.customer}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Processing"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-800">{order.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-center mt-8">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                  onClick={() => alert("View all orders functionality")}
                >
                  View All Orders
                </motion.button>
              </div>
            </motion.div>

            {/* Top Products */}
            <motion.div
              className="backdrop-blur-sm bg-white/70 border border-white/20 p-8 rounded-2xl shadow-xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.01, boxShadow: "0 25px 50px rgba(0,0,0,0.1)" }}
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6 flex items-center">
                <TrendingUp className="h-7 w-7 text-purple-600 mr-3" />
                Top Selling Products
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white/50 rounded-lg overflow-hidden">
                  <thead className="bg-white/80">
                    <tr className="border-b border-white/30">
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Product Name</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Sales</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((product) => (
                      <tr key={product.id} className="border-b border-white/20 last:border-b-0 hover:bg-white/60">
                        <td className="py-3 px-4 text-gray-800">{product.name}</td>
                        <td className="py-3 px-4 text-gray-800">{product.sales}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-center mt-8">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                  onClick={() => alert("View all products report functionality")}
                >
                  View Product Report
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Management Section */}
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
              Product Management
            </motion.h2>
            <motion.p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed" variants={itemVariants}>
              Manage your product inventory, add new items, and update existing ones.
            </motion.p>
          </motion.div>

          <motion.div
            className="backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-2xl shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.01, boxShadow: "0 25px 50px rgba(0,0,0,0.1)" }}
          >
            <div className="flex justify-end mb-6">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="backdrop-blur-md bg-white/20 text-white font-semibold py-3 px-6 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 shadow-lg flex items-center gap-2"
                onClick={() => alert("Add new product functionality")}
              >
                <PlusCircle className="h-5 w-5" />
                Add New Product
              </motion.button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white/50 rounded-lg overflow-hidden">
                <thead className="bg-white/80">
                  <tr className="border-b border-white/30">
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Product Name</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Category</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Stock</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Price</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {productsData.map((product) => (
                    <tr key={product.id} className="border-b border-white/20 last:border-b-0 hover:bg-white/60">
                      <td className="py-3 px-4 text-gray-800">{product.name}</td>
                      <td className="py-3 px-4 text-gray-800">{product.category}</td>
                      <td className="py-3 px-4 text-gray-800">{product.stock}</td>
                      <td className="py-3 px-4 text-gray-800">{product.price}</td>
                      <td className="py-3 px-4 flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => alert(`Edit product ${product.name}`)}
                        >
                          <Edit className="h-5 w-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-red-600 hover:text-red-800"
                          onClick={() => alert(`Delete product ${product.name}`)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </motion.button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Management Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Blog Management
            </motion.h2>
            <motion.p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed" variants={itemVariants}>
              Create, edit, and publish your blog posts to keep your audience engaged.
            </motion.p>
          </motion.div>

          <motion.div
            className="backdrop-blur-sm bg-white/70 border border-white/20 p-8 rounded-2xl shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.01, boxShadow: "0 25px 50px rgba(0,0,0,0.1)" }}
          >
            <div className="flex justify-end mb-6">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg flex items-center gap-2"
                onClick={() => alert("Create new blog post functionality")}
              >
                <PlusCircle className="h-5 w-5" />
                Create New Post
              </motion.button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white/50 rounded-lg overflow-hidden">
                <thead className="bg-white/80">
                  <tr className="border-b border-white/30">
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Title</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Author</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogPosts.map((post) => (
                    <tr key={post.id} className="border-b border-white/20 last:border-b-0 hover:bg-white/60">
                      <td className="py-3 px-4 text-gray-800">{post.title}</td>
                      <td className="py-3 px-4 text-gray-800">{post.author}</td>
                      <td className="py-3 px-4 text-gray-800">{post.date}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            post.status === "Published"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => alert(`Edit blog post ${post.title}`)}
                        >
                          <Edit className="h-5 w-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-red-600 hover:text-red-800"
                          onClick={() => alert(`Delete blog post ${post.title}`)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </motion.button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions Section */}
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
              Quick Actions
            </motion.h2>
            <motion.p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed" variants={itemVariants}>
              Perform common tasks quickly
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.button
              className="backdrop-blur-md bg-white/10 text-white p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center border border-white/20 hover:bg-white/15 transition-colors"
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(0,0,0,0.25)" }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
              onClick={() => navigateTo("products")}
            >
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full mb-4 shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Package className="h-10 w-10" />
              </motion.div>
              <span className="text-xl font-bold">Manage Products</span>
            </motion.button>

            <motion.button
              className="backdrop-blur-md bg-white/10 text-white p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center border border-white/20 hover:bg-white/15 transition-colors"
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(0,0,0,0.25)" }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
              onClick={() => alert("Add new order functionality")}
            >
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full mb-4 shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <ShoppingCart className="h-10 w-10" />
              </motion.div>
              <span className="text-xl font-bold">Add New Order</span>
            </motion.button>

            <motion.button
              className="backdrop-blur-md bg-white/10 text-white p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center border border-white/20 hover:bg-white/15 transition-colors"
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(0,0,0,0.25)" }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
              onClick={() => alert("View messages functionality")}
            >
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full mb-4 shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <MessageSquare className="h-10 w-10" />
              </motion.div>
              <span className="text-xl font-bold">View Messages</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6"
              variants={itemVariants}
            >
              Contact Information
            </motion.h2>
            <motion.p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed" variants={itemVariants}>
              Reach out to us for any inquiries or support
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="backdrop-blur-sm bg-white/70 border border-white/20 p-6 rounded-2xl text-center shadow-xl"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
            >
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full mx-auto mb-4 shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <MapPin className="h-10 w-10 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                Address
              </h3>
              <p className="text-gray-600">Opposite Chosath Yogini Mandir, Bhedaghat, Jabalpur, MP 482003</p>
            </motion.div>

            <motion.div
              className="backdrop-blur-sm bg-white/70 border border-white/20 p-6 rounded-2xl text-center shadow-xl"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
            >
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full mx-auto mb-4 shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Mail className="h-10 w-10 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                Email
              </h3>
              <p className="text-gray-600">info@vishnuhastkalakendra.com</p>
            </motion.div>

            <motion.div
              className="backdrop-blur-sm bg-white/70 border border-white/20 p-6 rounded-2xl text-center shadow-xl"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
            >
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full mx-auto mb-4 shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Phone className="h-10 w-10 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                Phone
              </h3>
              <p className="text-gray-600">+91 79745 07514</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
