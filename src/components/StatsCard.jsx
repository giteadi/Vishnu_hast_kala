"use client"
import { motion } from "framer-motion"

const StatsCard = ({ icon: Icon, value, label }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="bg-primary p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
        <Icon className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-4xl font-bold text-dark mb-2">{value}</h3>
      <p className="text-gray-600">{label}</p>
    </motion.div>
  )
}

export default StatsCard
