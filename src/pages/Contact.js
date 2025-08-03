// Contact.js - Contact page component

const { useState } = React;
const { motion } = Motion;

const Contact = () => {
    // State for map visibility toggle
    const [showMap, setShowMap] = useState(false);
    
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
                            We'd love to hear from you. Reach out for inquiries, custom orders, or to visit our workshop.
                        </motion.p>
                    </div>
                </div>
            </section>
            
            {/* Contact Information Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
                            <motion.h2 
                                className="text-3xl font-bold text-dark mb-6"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                Send Us a Message
                            </motion.h2>
                            <motion.p 
                                className="text-gray-600 mb-8"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                Whether you have a question about our products, custom orders, or would like to schedule a visit, we're here to help.
                            </motion.p>
                            
                            <ContactForm />
                        </div>
                        
                        {/* Contact Information */}
                        <div>
                            <motion.h2 
                                className="text-3xl font-bold text-dark mb-6"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                Contact Information
                            </motion.h2>
                            <motion.p 
                                className="text-gray-600 mb-8"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                Visit our workshop to see our artisans at work and browse our collection in person.
                            </motion.p>
                            
                            <div className="space-y-8">
                                {/* Address */}
                                <motion.div 
                                    className="flex items-start"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    <div className="bg-primary p-3 rounded-full text-white mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-dark mb-1">Our Location</h3>
                                        <p className="text-gray-600">Opposite of Chosath Yogini Mandir,</p>
                                        <p className="text-gray-600">Bhedaghat, Madhya Pradesh 482003, India</p>
                                        <button 
                                            className="text-primary font-medium mt-2 flex items-center hover:underline"
                                            onClick={() => setShowMap(!showMap)}
                                        >
                                            {showMap ? 'Hide Map' : 'View on Map'}
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    </div>
                                </motion.div>
                                
                                {/* Map (conditionally rendered) */}
                                {showMap && (
                                    <motion.div 
                                        className="rounded-lg overflow-hidden shadow-lg h-64 md:h-80"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {/* In a real implementation, this would be a Google Maps embed */}
                                        <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                                            <p className="text-gray-500">Google Maps would be embedded here</p>
                                            {/* Example of how to embed Google Maps:
                                            <iframe 
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3668.5284550943716!2d79.80235091541671!3d23.129029984903192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3981b4148395f967%3A0x43a66ba641bcf802!2sChausath%20Yogini%20Temple!5e0!3m2!1sen!2sin!4v1631234567890!5m2!1sen!2sin" 
                                                width="100%" 
                                                height="100%" 
                                                style={{border:0}} 
                                                allowFullScreen="" 
                                                loading="lazy"
                                            ></iframe>
                                            */}
                                        </div>
                                    </motion.div>
                                )}
                                
                                {/* Phone */}
                                <motion.div 
                                    className="flex items-start"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    <div className="bg-primary p-3 rounded-full text-white mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-dark mb-1">Phone Number</h3>
                                        <p className="text-gray-600">+91 79745 07514</p>
                                        <p className="text-gray-500 text-sm mt-1">Available daily from 9 AM to 10 PM</p>
                                    </div>
                                </motion.div>
                                
                                {/* Email */}
                                <motion.div 
                                    className="flex items-start"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                >
                                    <div className="bg-primary p-3 rounded-full text-white mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-dark mb-1">Email Address</h3>
                                        <p className="text-gray-600">info@vishnuhastkalakendra.com</p>
                                        <p className="text-gray-500 text-sm mt-1">We aim to respond within 24 hours</p>
                                    </div>
                                </motion.div>
                                
                                {/* Business Hours */}
                                <motion.div 
                                    className="flex items-start"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                >
                                    <div className="bg-primary p-3 rounded-full text-white mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-dark mb-1">Business Hours</h3>
                                        <p className="text-gray-600">Open daily</p>
                                        <p className="text-gray-600">9:00 AM - 10:00 PM</p>
                                    </div>
                                </motion.div>
                                
                                {/* Payment Methods */}
                                <motion.div 
                                    className="flex items-start"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.7 }}
                                >
                                    <div className="bg-primary p-3 rounded-full text-white mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-dark mb-1">Payment Methods</h3>
                                        <p className="text-gray-600">We accept checks, NFC mobile payments,</p>
                                        <p className="text-gray-600">Google Pay, and cash</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* FAQ Section */}
            <section className="py-16 bg-light">
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
                            Find answers to common questions about our products and services
                        </motion.p>
                    </div>
                    
                    <div className="max-w-3xl mx-auto">
                        <FAQ 
                            question="Do you ship your products internationally?"
                            answer="Yes, we ship our marble statues and handicrafts worldwide. International shipping typically takes 10-15 business days, and shipping costs are calculated based on the weight, dimensions, and destination of the package."
                            delay={0.3}
                        />
                        
                        <FAQ 
                            question="Can I commission a custom statue or sculpture?"
                            answer="Absolutely! We specialize in custom orders. Please contact us with your requirements, and our master craftsmen will work with you to create a piece according to your specifications. We can create custom busts, deity statues, and decorative pieces in various sizes."
                            delay={0.4}
                        />
                        
                        <FAQ 
                            question="How do I care for my marble statue?"
                            answer="To maintain the beauty of your marble statue, dust it regularly with a soft cloth. For deeper cleaning, use a mild soap solution and rinse thoroughly. Avoid acidic cleaners and keep the statue away from direct sunlight and extreme temperature changes. We recommend applying a marble sealer once a year for added protection."
                            delay={0.5}
                        />
                        
                        <FAQ 
                            question="What is the typical lead time for custom orders?"
                            answer="The lead time for custom orders varies depending on the complexity and size of the piece. Simple pieces may take 4-6 weeks, while more intricate works can take 2-3 months. We'll provide you with a specific timeline during the consultation process."
                            delay={0.6}
                        />
                        
                        <FAQ 
                            question="Can I visit your workshop to see the crafting process?"
                            answer="Yes, visitors are welcome at our workshop in Bhedaghat. You can observe our artisans at work and learn about the traditional techniques of marble carving. We recommend calling ahead to ensure someone is available to guide you through the process."
                            delay={0.7}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

// FAQ Component
const FAQ = ({ question, answer, delay }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <motion.div 
            className="mb-4 border-b border-gray-200 pb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
        >
            <button 
                className="flex justify-between items-center w-full text-left focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-xl font-bold text-dark">{question}</h3>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 text-primary transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                    height: isOpen ? 'auto' : 0,
                    opacity: isOpen ? 1 : 0,
                    marginTop: isOpen ? '1rem' : '0'
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <p className="text-gray-600">{answer}</p>
            </motion.div>
        </motion.div>
    );
};