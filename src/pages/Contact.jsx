"use client"
import { motion } from "framer-motion"
import { MapPin, Mail, Phone, Clock } from "lucide-react"
import ContactForm from "../components/ContactForm"
import FAQ from "../components/FAQ" // Declare the FAQ variable

const Contact = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-dark text-white py-24">
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Contact Us
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We'd love to hear from you! Reach out for inquiries, custom orders, or support.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Details & Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <motion.div
              className="bg-light p-8 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-dark mb-6">Get in Touch</h2>
              <p className="text-gray-700 mb-8">
                Whether you have a question about our products, need assistance with an order, or want to discuss a
                custom marble creation, our team is here to help.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-7 w-7 text-primary mr-4 mt-1 shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-dark mb-1">Our Address</h3>
                    <p className="text-gray-700">
                      Opposite Chosath Yogini Mandir, Bhedaghat, Jabalpur, Madhya Pradesh 482003, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-7 w-7 text-primary mr-4 mt-1 shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-dark mb-1">Email Us</h3>
                    <p className="text-gray-700">info@vishnuhastkalakendra.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-7 w-7 text-primary mr-4 mt-1 shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-dark mb-1">Call Us</h3>
                    <p className="text-gray-700">+91 79745 07514</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-7 w-7 text-primary mr-4 mt-1 shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-dark mb-1">Working Hours</h3>
                    <p className="text-gray-700">Monday - Saturday: 9:00 AM - 6:00 PM (IST)</p>
                    <p className="text-gray-700">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-dark mb-6">Send Us a Message</h2>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.9000000000005!2d79.80000000000001!3d23.150000000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3981a9a9a9a9a9a9%3A0x9a9a9a9a9a9a9a9a!2sChausath%20Yogini%20Temple%2C%20Bhedaghat!5e0!3m2!1sen!2sin!4v1678901234567!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location on Map"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl font-bold text-dark mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Find answers to common questions about our products, services, and custom orders.
            </motion.p>
          </div>
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
        </div>
      </section>
    </div>
  )
}

export default Contact
