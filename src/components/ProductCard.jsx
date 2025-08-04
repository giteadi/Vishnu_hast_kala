"use client"

import { motion } from "framer-motion"
import { IndianRupee, Star, Eye, Heart } from "lucide-react"
import { useState } from "react"

const ProductCard = ({ product, navigateTo }) => {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <motion.div
      className="group backdrop-blur-sm bg-white/70 border border-white/20 rounded-2xl shadow-xl overflow-hidden"
      whileHover={{
        y: -10,
        scale: 1.02,
        boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <motion.img
          src={product.image || "/placeholder.svg?height=400&width=400&query=marble%20product"}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Overlay with Actions */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <div className="absolute top-4 right-4 flex gap-2">
            <motion.button
              className="backdrop-blur-md bg-white/20 border border-white/30 p-2 rounded-full text-white hover:bg-white/30 transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            </motion.button>
            <motion.button
              className="backdrop-blur-md bg-white/20 border border-white/30 p-2 rounded-full text-white hover:bg-white/30 transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Eye className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Quick View Button */}
          <div className="absolute bottom-4 left-4 right-4">
            <motion.button
              className="w-full backdrop-blur-md bg-white/20 border border-white/30 text-white font-medium py-2 px-4 rounded-full hover:bg-white/30 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo(`/products/${product.id}`)}
            >
              Quick View
            </motion.button>
          </div>
        </motion.div>

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
          className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-200"
          whileHover={{ x: 5 }}
        >
          {product.name}
        </motion.h3>

        <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">{product.shortDescription}</p>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
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
              <IndianRupee className="h-5 w-5 mr-1 text-blue-600" />
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
          onClick={() => navigateTo(`/products/${product.id}`)}
        >
          <span className="flex items-center justify-center gap-2">
            <Eye className="w-4 h-4" />
            View Details
          </span>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default ProductCard
