"use client"
import { motion } from "framer-motion"
import { IndianRupee } from "lucide-react"

const ProductCard = ({ product, navigateTo }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={product.image || "/placeholder.svg?height=400&width=400&query=marble%20product"}
        alt={product.name}
        className="w-full h-64 object-cover"
        loading="lazy"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-dark mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{product.shortDescription}</p>
        <div className="flex items-center justify-between mb-4">
          {product.price ? (
            <p className="text-2xl font-bold text-primary flex items-center">
              <IndianRupee className="h-5 w-5 mr-1" />
              {product.price}
            </p>
          ) : (
            <p className="text-lg font-bold text-primary">Price on Request</p>
          )}
          {product.isNew && (
            <span className="bg-accent text-dark text-xs font-bold px-3 py-1 rounded-full">New Arrival</span>
          )}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary text-white font-medium py-2 px-6 rounded-full hover:bg-accent transition-colors w-full"
          onClick={() => navigateTo(`/products/${product.id}`)} // Example navigation
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  )
}

export default ProductCard
