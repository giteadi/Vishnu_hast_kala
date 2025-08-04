"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { MapPin, Mail, Phone, Clock, Send, MessageCircle } from "lucide-react"
import ContactForm from "../components/ContactForm"
import FAQ from "../components/FAQ"

const Contact = () => {
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
              Contact Us
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-white/90 drop-shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              We'd love to hear from you! Reach out for inquiries, custom orders, or support.
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Details & Form Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-50">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Details */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <motion.div
                className="backdrop-blur-sm bg-white/70 border border-white/20 p-8 rounded-2xl shadow-xl"
                variants={itemVariants}
                whileHover={{ scale: 1.02, shadow: "0 25px 50px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
                  Get in Touch
                </h2>
                <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                  Whether you have a question about our products, need assistance with an order, or want to discuss a
                  custom marble creation, our team is here to help.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      icon: MapPin,
                      title: "Our Address",
                      content: "Opposite Chosath Yogini Mandir, Bhedaghat, Jabalpur, Madhya Pradesh 482003, India",
                    },
                    {
                      icon: Mail,
                      title: "Email Us",
                      content: "info@vishnuhastkalakendra.com",
                    },
                    {
                      icon: Phone,
                      title: "Call Us",
                      content: "+91 79745 07514",
                    },
                    {
                      icon: Clock,
                      title: "Working Hours",
                      content: "Monday - Saturday: 9:00 AM - 6:00 PM (IST)\nSunday: Closed",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start backdrop-blur-sm bg-white/50 border border-white/20 p-4 rounded-xl"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.8)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full mr-4 mt-1 shadow-lg"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <item.icon className="h-6 w-6 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{item.title}</h3>
                        <p className="text-gray-700 whitespace-pre-line">{item.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="backdrop-blur-sm bg-white/70 border border-white/20 p-8 rounded-2xl shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6 flex items-center">
                  <MessageCircle className="mr-3 text-blue-600" />
                  Send Us a Message
                </h2>
                <ContactForm />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="backdrop-blur-sm bg-white/70 border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="p-6">
              <h3 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Find Us Here
              </h3>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.9000000000005!2d79.80000000000001!3d23.150000000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3981a9a9a9a9a9a9%3A0x9a9a9a9a9a9a9a9a!2sChausath%20Yogini%20Temple%2C%20Bhedaghat!5e0!3m2!1sen!2sin!4v1678901234567!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location on Map"
              className="rounded-b-3xl"
            />
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Frequently Asked Questions
            </motion.h2>
            <motion.p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed" variants={itemVariants}>
              Find answers to common questions about our products, services, and custom orders.
            </motion.p>
          </motion.div>

          <motion.div
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <FAQ
              questions={[
                {
                  question: "What type of marble do you use for your statues?",
                  answer:
                    "We primarily use high-quality white Makrana marble, known for its purity, durability, and luminous finish. We also work with other types of marble and stone based on client requirements.",
                },
                {
                  question: "Do you offer custom marble statue services?",
                  answer:
                    "Yes, we specialize in custom orders. Our skilled artisans can create personalized marble statues, busts, and other artifacts based on your designs, photographs, or specific requirements.",
                },
                {
                  question: "How long does it take to complete a custom order?",
                  answer:
                    "The timeline for custom orders varies depending on the complexity, size, and detailing required. We will provide an estimated completion time during the consultation and design phase.",
                },
                {
                  question: "Do you ship internationally?",
                  answer:
                    "Yes, we offer international shipping. We ensure that all products are carefully packed and shipped with reliable carriers to ensure safe delivery to your location.",
                },
                {
                  question: "How should I care for my marble statue?",
                  answer:
                    "Marble statues should be cleaned gently with a soft, damp cloth. Avoid harsh chemicals or abrasive cleaners. We recommend applying a marble sealer periodically to protect the surface. Detailed care instructions are provided with each purchase.",
                },
              ]}
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-purple-600/50"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(59, 130, 246, 0.5) 0%, rgba(147, 51, 234, 0.5) 100%)",
              "linear-gradient(45deg, rgba(147, 51, 234, 0.5) 0%, rgba(59, 130, 246, 0.5) 100%)",
              "linear-gradient(45deg, rgba(59, 130, 246, 0.5) 0%, rgba(147, 51, 234, 0.5) 100%)",
            ],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-12 shadow-2xl max-w-4xl mx-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to Start Your Project?
            </motion.h2>
            <motion.p
              className="text-xl mb-10 max-w-2xl mx-auto text-white/90 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Let's bring your vision to life with our expert craftsmanship and dedication to excellence.
            </motion.p>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              className="backdrop-blur-md bg-white/10 text-white font-semibold py-4 px-12 rounded-full text-xl border border-white/30 hover:bg-white/20 transition-all duration-300 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="flex items-center gap-3">
                <Send className="w-6 h-6" />
                Get Started Today
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact
