"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Frown } from "lucide-react"
import BlogPost from "../components/BlogPost" 
import { useNavigate } from "react-router-dom"
import { blogPosts } from "../data/blog-data" 

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredPosts, setFilteredPosts] = useState([])
  const [featuredPost, setFeaturedPost] = useState(null)
  const navigate = useNavigate()

  // Blog categories
  const categories = [
    { id: "all", name: "All Posts" },
    { id: "art", name: "Art & Culture" },
    { id: "craftsmanship", name: "Craftsmanship" },
    { id: "history", name: "History" },
    { id: "tips", name: "Care Tips" },
    { id: "news", name: "News & Events" },
  ]

  // Format date function (moved here)
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  // Set featured post and filter posts based on category and search query
  useEffect(() => {
    // Set featured post
    const featured = blogPosts.find((post) => post.featured)
    setFeaturedPost(featured || blogPosts[0])

    // Filter posts
    let result = blogPosts

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((post) => post.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (post) => post.title.toLowerCase().includes(query) || post.excerpt.toLowerCase().includes(query),
      )
    }

    setFilteredPosts(result)
  }, [selectedCategory, searchQuery])

  const navigateTo = (path) => {
    navigate(path)
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

      {/* Hero Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 shadow-xl">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our Blog
            </motion.h1>
            <motion.p
              className="text-xl text-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Insights, stories, and expertise from the world of marble craftsmanship
            </motion.p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-white">Featured Article</h2>
            </div>
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden border border-white/20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2">
                  <img
                    src={featuredPost.image || "/placeholder.svg?height=400&width=600&query=featured%20blog%20post"}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center text-white">
                  <div className="flex items-center mb-4">
                    <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full mr-3">
                      {categories.find((cat) => cat.id === featuredPost.category)?.name}
                    </span>
                    <span className="text-gray-200 text-sm">
                      {formatDate(featuredPost.date)} • {featuredPost.readTime}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h3>
                  <p className="text-gray-300 mb-6">{featuredPost.excerpt}</p>
                  <div className="flex items-center mb-6">
                    <img
                      src={featuredPost.author.avatar || "/placeholder.svg?height=40&width=40&query=author%20avatar"}
                      alt={featuredPost.author.name}
                      className="w-10 h-10 rounded-full mr-3 border-2 border-white/50"
                    />
                    <div>
                      <p className="font-medium text-white">{featuredPost.author.name}</p>
                      <p className="text-sm text-gray-300">{featuredPost.author.title}</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium py-3 px-8 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg self-start"
                    onClick={() => navigateTo(`/blog/${featuredPost.id}`)}
                  >
                    Read Full Article
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Search and Filter */}
          <div className="mb-12 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Categories */}
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md"
                        : "bg-white/20 text-gray-100 hover:bg-white/30 border border-white/20"
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.name}
                  </motion.button>
                ))}
              </div>

              {/* Search */}
              <div className="w-full md:w-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full md:w-64 px-4 py-2 pl-10 rounded-full bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 border border-white/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="h-5 w-5 text-gray-300 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogPost key={post.id} post={post} formatDate={formatDate} isSummary={true} navigateTo={navigateTo} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 shadow-lg">
              <Frown className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
              <p className="text-gray-300">Try adjusting your search or filter criteria</p>
              <motion.button
                className="mt-4 text-white font-medium hover:underline bg-gradient-to-r from-purple-600 to-blue-600 py-2 px-6 rounded-full shadow-lg"
                onClick={() => {
                  setSelectedCategory("all")
                  setSearchQuery("")
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear filters
              </motion.button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-purple-800 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 shadow-xl">
            <motion.h2
              className="text-3xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Subscribe to Our Newsletter
            </motion.h2>
            <motion.p
              className="text-xl mb-8 text-gray-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Stay updated with our latest articles, events, and special offers
            </motion.p>
            <motion.div
              className="flex flex-col md:flex-row gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-full bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 border border-white/20"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-800 font-medium py-3 px-8 rounded-full hover:bg-gray-200 transition-colors md:self-start shadow-lg"
              >
                Subscribe
              </motion.button>
            </motion.div>
            <p className="text-sm mt-4 text-gray-300">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Blog
