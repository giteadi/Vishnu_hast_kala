"use client"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { blogPosts } from "../data/blog-data" // Import blogPosts data

const BlogPostPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)

  useEffect(() => {
    const foundPost = blogPosts.find((p) => p.id === Number.parseInt(id))
    setPost(foundPost)
  }, [id])

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center p-8 rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-4">Post Not Found</h2>
          <p className="text-lg">The blog post you are looking for does not exist.</p>
          <motion.button
            onClick={() => navigate("/blog")}
            className="mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            Go to Blog
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 text-white overflow-hidden">
      {/* Floating background elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"
        animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-56 h-56 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"
        animate={{ x: [0, 50, 0], y: [0, 100, 0] }}
        transition={{ duration: 11, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.button
          onClick={() => navigate("/blog")}
          className="flex items-center text-white text-lg mb-8 px-4 py-2 rounded-full backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-colors duration-300 shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="h-5 w-5 mr-2" /> Back to Blog
        </motion.button>

        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-xl p-8 md:p-12 border border-white/20 shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <motion.img
            src={post.image || "/placeholder.svg?height=600&width=1000&query=blog%20post%20image"}
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg mb-8 shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />

          <div className="flex items-center mb-4 text-gray-200">
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full mr-3">
              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
            </span>
            <span className="text-sm">
              {formatDate(post.date)} • {post.readTime}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">{post.title}</h1>

          <div className="flex items-center mb-8">
            <img
              src={post.author.avatar || "/placeholder.svg?height=40&width=40&query=author%20avatar"}
              alt={post.author.name}
              className="w-12 h-12 rounded-full mr-4 border-2 border-white/50 shadow-md"
            />
            <div>
              <p className="font-medium text-white text-lg">{post.author.name}</p>
              <p className="text-sm text-gray-300">{post.author.title}</p>
            </div>
          </div>

          <motion.div
            className="prose prose-invert max-w-none text-gray-100 leading-relaxed text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default BlogPostPage
