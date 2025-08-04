"use client"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const BlogPost = ({ post, formatDate, isSummary, navigateTo }) => {
  const categories = [
    { id: "all", name: "All Posts" },
    { id: "art", name: "Art & Culture" },
    { id: "craftsmanship", name: "Craftsmanship" },
    { id: "history", name: "History" },
    { id: "tips", name: "Care Tips" },
    { id: "news", name: "News & Events" },
  ]

  const categoryName = categories.find((cat) => cat.id === post.category)?.name || post.category

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden border border-white/20 text-white"
      whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={post.image || "/placeholder.svg?height=400&width=600&query=blog%20post"}
        alt={post.title}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-6">
        <div className="flex items-center mb-3">
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full mr-3">
            {categoryName}
          </span>
          <span className="text-gray-200 text-sm">
            {formatDate(post.date)} • {post.readTime}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 leading-tight">{post.title}</h3>
        {isSummary && <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>}
        <div className="flex items-center mb-4">
          <img
            src={post.author.avatar || "/placeholder.svg?height=32&width=32&query=author%20avatar"}
            alt={post.author.name}
            className="w-8 h-8 rounded-full mr-3 border border-white/30"
          />
          <div>
            <p className="font-medium text-white">{post.author.name}</p>
            <p className="text-xs text-gray-300">{post.author.title}</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-2 flex items-center text-white font-medium py-2 px-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
          onClick={() => navigateTo(`/blog/${post.id}`)}
        >
          Read More <ArrowRight className="ml-2 h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default BlogPost
