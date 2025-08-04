"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { CheckCircle, Lightbulb, Award, Target } from "lucide-react"
import { useNavigate } from "react-router-dom"

const About = () => {
  const navigate = useNavigate()
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

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Aditya Sharma",
      role: "Founder & Master Craftsman",
      image: "/placeholder.svg?height=400&width=400",
      bio: "With over 20 years of experience in marble craftsmanship, Aditya leads our team with passion and expertise.",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Senior Artisan",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Rajesh specializes in intricate detailing and has been creating masterpieces for more than 15 years.",
    },
    {
      id: 3,
      name: "Priya Verma",
      role: "Design Specialist",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Priya brings contemporary design sensibilities to our traditional craft, creating unique and modern pieces.",
    },
    {
      id: 4,
      name: "Vikram Singh",
      role: "Production Manager",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Vikram ensures that all our products meet the highest quality standards before they reach our customers.",
    },
  ]

  const navigateTo = (path) => {
    navigate(`/${path}`)
  }

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

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
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
              About Vishnu Hast Kala Kendra
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-white/90 drop-shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Crafting divine beauty in marble{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent font-semibold">
                since 1985
              </span>
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
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
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              variants={floatingVariants}
              animate="animate"
            >
              <motion.div
                className="backdrop-blur-sm bg-white/30 border border-white/20 rounded-3xl p-4 shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/placeholder.svg?height=500&width=600"
                  alt="Our workshop"
                  className="rounded-2xl w-full shadow-xl"
                />
              </motion.div>
              <motion.div
                className="absolute -bottom-6 -right-6 backdrop-blur-md bg-white/80 border border-white/30 p-6 rounded-2xl shadow-2xl"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-blue-600 font-bold text-xl">Since 1985</p>
                <p className="text-gray-600 font-medium">Crafting Excellence</p>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="backdrop-blur-sm bg-white/70 border border-white/20 rounded-2xl p-8 shadow-xl"
                whileHover={{ scale: 1.02, shadow: "0 25px 50px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
                  Our Story
                </h2>
                <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                  <p>
                    Vishnu Hastkala Kendra was founded in 1985 by Mr. Vishnu Sharma, a master craftsman with a vision to
                    preserve and promote the traditional art of marble sculpting. Located in the picturesque town of
                    Bhedaghat, Jabalpur, our workshop draws inspiration from the natural beauty of the Narmada River and
                    the magnificent marble rocks that surround it.
                  </p>
                  <p>
                    What began as a small family business has now grown into a renowned establishment, recognized for
                    its exceptional craftsmanship and dedication to quality. Today, the legacy continues under the
                    leadership of Aditya Sharma, who has expanded the business while staying true to the traditional
                    techniques and values established by his father.
                  </p>
                  <p>
                    Over the decades, we have had the privilege of creating exquisite marble statues and artifacts for
                    temples, institutions, and private collectors across India and around the world. Our commitment to
                    excellence and attention to detail has earned us a reputation as one of the finest marble craftsmen
                    in the region.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
              variants={itemVariants}
            >
              Our Mission & Values
            </motion.h2>
            <motion.p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed" variants={itemVariants}>
              Guided by tradition, driven by innovation, and committed to excellence
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Target,
                title: "Our Mission",
                content:
                  "To preserve and promote the ancient art of marble craftsmanship while creating pieces that inspire devotion, admiration, and a deep appreciation for traditional Indian artistry. We aim to transform divine visions into tangible forms that enrich spaces and touch hearts.",
              },
              {
                icon: Award,
                title: "Our Values",
                items: [
                  {
                    label: "Craftsmanship",
                    desc: "We uphold the highest standards of artistry and attention to detail.",
                  },
                  {
                    label: "Integrity",
                    desc: "We conduct our business with honesty, transparency, and ethical practices.",
                  },
                  {
                    label: "Tradition",
                    desc: "We honor and preserve traditional techniques passed down through generations.",
                  },
                  { label: "Innovation", desc: "We embrace new ideas and techniques to enhance our craft." },
                ],
              },
              {
                icon: Lightbulb,
                title: "Our Approach",
                content:
                  "We believe that each piece of marble holds within it a divine form waiting to be revealed. Our approach combines traditional hand-carving techniques with modern tools when necessary, ensuring that each creation is both authentic and durable. We work closely with our clients to understand their vision and bring it to life with precision and artistry.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                }}
                className="backdrop-blur-sm bg-white/70 border border-white/20 p-8 rounded-2xl shadow-xl"
              >
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-6 shadow-lg"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <item.icon className="h-10 w-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
                {item.content ? (
                  <p className="text-gray-600 leading-relaxed">{item.content}</p>
                ) : (
                  <ul className="space-y-3">
                    {item.items.map((subItem, subIndex) => (
                      <li key={subIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">
                          <strong className="text-gray-800">{subItem.label}:</strong> {subItem.desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Process Section */}
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
              Our Crafting Process
            </motion.h2>
            <motion.p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed" variants={itemVariants}>
              From raw marble to divine masterpiece - our meticulous process ensures excellence at every step
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                step: "1",
                title: "Selection",
                description:
                  "We carefully select the finest quality marble from trusted quarries, examining each piece for purity, strength, and character.",
              },
              {
                step: "2",
                title: "Design",
                description:
                  "Our artists create detailed sketches and models based on traditional iconography or custom requirements, ensuring perfect proportions and aesthetics.",
              },
              {
                step: "3",
                title: "Carving",
                description:
                  "Our master craftsmen use traditional techniques and tools to carve the marble, gradually revealing the form hidden within the stone.",
              },
              {
                step: "4",
                title: "Finishing",
                description:
                  "The final piece undergoes meticulous detailing, polishing, and quality checks to ensure a flawless finish that will last for generations.",
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="text-center backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-2xl"
              >
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  {process.step}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3">{process.title}</h3>
                <p className="text-gray-300 leading-relaxed">{process.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
              variants={itemVariants}
            >
              Meet Our Team
            </motion.h2>
            <motion.p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed" variants={itemVariants}>
              The skilled artisans and professionals behind our exquisite creations
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                }}
                className="backdrop-blur-sm bg-white/70 border border-white/20 rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
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
              Visit Our Workshop
            </motion.h2>
            <motion.p
              className="text-xl mb-10 max-w-2xl mx-auto text-white/90 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Experience the art of marble crafting firsthand. Visit our workshop in Bhedaghat, Jabalpur, and witness
              our artisans at work.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-6"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                className="backdrop-blur-md bg-white/10 text-white font-semibold py-4 px-10 rounded-full text-lg border border-white/30 hover:bg-white/20 transition-all duration-300 shadow-xl"
                onClick={() => navigateTo("contact")}
              >
                Contact Us
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                className="backdrop-blur-md bg-transparent border-2 border-white/30 text-white font-semibold py-4 px-10 rounded-full text-lg hover:bg-white/10 transition-all duration-300 shadow-xl"
                onClick={() => navigateTo("products")}
              >
                View Our Products
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
