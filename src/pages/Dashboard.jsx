"use client"
import { motion } from "framer-motion"
import { Users, Package, ShoppingCart, DollarSign, TrendingUp, Clock, MapPin, Mail, Phone } from "lucide-react"
import { useNavigate } from "react-router-dom" // Using react-router-dom's useNavigate

const Dashboard = () => {
  const navigate = useNavigate()

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

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-24">
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Admin Dashboard
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Overview of your business operations
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon // Destructure the icon component
              return (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-indigo-100 p-3 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-gray-600 text-lg">{stat.label}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Recent Orders & Top Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="h-6 w-6 text-indigo-600 mr-2" />
                Recent Orders
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Product</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Customer</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Status</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 last:border-b-0">
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
              <div className="text-center mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-indigo-600 font-medium hover:underline"
                  onClick={() => alert("View all orders functionality")}
                >
                  View All Orders
                </motion.button>
              </div>
            </motion.div>

            {/* Top Products */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 text-indigo-600 mr-2" />
                Top Selling Products
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Product Name</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Sales</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((product) => (
                      <tr key={product.id} className="border-b border-gray-100 last:border-b-0">
                        <td className="py-3 px-4 text-gray-800">{product.name}</td>
                        <td className="py-3 px-4 text-gray-800">{product.sales}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-center mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-indigo-600 font-medium hover:underline"
                  onClick={() => alert("View all products report functionality")}
                >
                  View Product Report
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Quick Actions
            </motion.h2>
            <motion.p
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Perform common tasks quickly
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.button
              className="bg-indigo-600 text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center hover:bg-indigo-700 transition-colors"
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onClick={() => navigateTo("products")}
            >
              <Package className="h-12 w-12 mb-3" />
              <span className="text-xl font-bold">Manage Products</span>
            </motion.button>

            <motion.button
              className="bg-indigo-600 text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center hover:bg-indigo-700 transition-colors"
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={() => alert("Add new order functionality")}
            >
              <ShoppingCart className="h-12 w-12 mb-3" />
              <span className="text-xl font-bold">Add New Order</span>
            </motion.button>

            <motion.button
              className="bg-indigo-600 text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center hover:bg-indigo-700 transition-colors"
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              onClick={() => navigateTo("contact")}
            >
              <Mail className="h-12 w-12 mb-3" />
              <span className="text-xl font-bold">View Messages</span>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Contact Information
            </motion.h2>
            <motion.p
              className="text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Reach out to us for any inquiries or support
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-gray-800 p-6 rounded-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <MapPin className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Address</h3>
              <p className="text-gray-300">Opposite Chosath Yogini Mandir, Bhedaghat, Jabalpur, MP 482003</p>
            </motion.div>

            <motion.div
              className="bg-gray-800 p-6 rounded-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Mail className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-gray-300">info@vishnuhastkalakendra.com</p>
            </motion.div>

            <motion.div
              className="bg-gray-800 p-6 rounded-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Phone className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Phone</h3>
              <p className="text-gray-300">+91 79745 07514</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
