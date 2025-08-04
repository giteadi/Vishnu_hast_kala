"use client"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

const FAQ = ({ questions }) => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {questions.map((q, index) => (
        <div key={index} className="border-b border-gray-200 last:border-b-0 py-4">
          <button
            className="flex justify-between items-center w-full text-left font-bold text-dark text-lg focus:outline-none"
            onClick={() => toggleFAQ(index)}
          >
            {q.question}
            <motion.span
              initial={false}
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-6 w-6 text-primary" />
            </motion.span>
          </button>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: openIndex === index ? "auto" : 0,
              opacity: openIndex === index ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-gray-600 mt-2 pr-8">{q.answer}</p>
          </motion.div>
        </div>
      ))}
    </motion.div>
  )
}

export default FAQ
