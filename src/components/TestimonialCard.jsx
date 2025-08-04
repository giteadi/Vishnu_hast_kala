"use client"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
    >
      <img
        src={testimonial.avatar || "/placeholder.svg?height=80&width=80&query=person%20avatar"}
        alt={testimonial.name}
        className="w-20 h-20 rounded-full object-cover mb-4"
        loading="lazy"
      />
      <div className="flex mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
        ))}
      </div>
      <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
      <h3 className="text-lg font-bold text-dark">{testimonial.name}</h3>
      <p className="text-gray-500 text-sm">{testimonial.location}</p>
    </motion.div>
  )
}

export default TestimonialCard
