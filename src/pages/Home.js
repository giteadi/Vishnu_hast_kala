// Home.js - Home page component

const { useEffect, useRef } = React;
const { motion } = Motion;

const Home = ({ navigateTo }) => {
    const featuredProductsRef = useRef(null);
    
    // Sample featured products data
    const featuredProducts = [
        {
            id: 1,
            name: 'Marble Ganesh Statue',
            image: './assets/images/product1.jpg',
            shortDescription: 'Beautifully crafted white marble Ganesh statue with intricate detailing.',
            price: '12,500',
            isNew: true
        },
        {
            id: 2,
            name: 'Radha Krishna Idol',
            image: './assets/images/product2.jpg',
            shortDescription: 'Elegant Radha Krishna marble statue, perfect for home temples.',
            price: '18,900',
            isNew: false
        },
        {
            id: 3,
            name: 'Peacock Sankh',
            image: './assets/images/product3.jpg',
            shortDescription: 'Intricately carved marble sankh with peacock design for sacred rituals.',
            price: '8,500',
            isNew: true
        },
        {
            id: 4,
            name: 'Custom Marble Bust',
            image: './assets/images/product4.jpg',
            shortDescription: 'Personalized marble busts crafted with precision and artistry.',
            price: null, // Price on request
            isNew: false
        }
    ];
    
    // Sample testimonials data
    const testimonials = [
        {
            id: 1,
            name: 'Rajesh Sharma',
            location: 'Delhi, India',
            rating: 5,
            text: 'The craftsmanship of the marble Ganesh statue I purchased is exceptional. The attention to detail is remarkable, and it has become the centerpiece of my home temple. Highly recommended!',
            avatar: './assets/images/testimonial1.jpg'
        },
        {
            id: 2,
            name: 'Priya Patel',
            location: 'Mumbai, India',
            rating: 5,
            text: 'I ordered a custom marble bust of my grandfather, and the result exceeded my expectations. The likeness is uncanny, and the quality of the marble is superb. A treasured family heirloom now.',
            avatar: './assets/images/testimonial2.jpg'
        },
        {
            id: 3,
            name: 'Amit Verma',
            location: 'Jabalpur, India',
            rating: 5,
            text: 'Vishnu Hast Kala Kendra has the best collection of marble statues I have ever seen. The Radha Krishna idol I purchased is simply divine. The service was excellent, and delivery was prompt.',
            avatar: './assets/images/testimonial3.jpg'
        }
    ];
    
    // Scroll to featured products section
    const scrollToProducts = () => {
        featuredProductsRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    
    return (
        <div>
            {/* Hero Section */}
          
<section className="hero-section h-screen flex items-center justify-center text-center text-white relative overflow-hidden">
    {/* Background Image */}
    <img
        src="https://res.cloudinary.com/bazeercloud/image/upload/v1754207183/ChatGPT_Image_Aug_3_2025_01_14_13_PM_bfkiko.png"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        loading="lazy"
        style={{ filter: 'brightness(0.5)' }}
    />
    <div className="container mx-auto px-4 relative z-10">
        <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 text-shadow"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            VISHNU HAST KALA KENDRA
        </motion.h1>
        
        <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
        >
            Welcome to our shop where we shape your Imagination To Reality
        </motion.p>
        
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
        >
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white font-medium py-3 px-8 rounded-full text-lg hover:bg-accent transition-colors"
                onClick={() => navigateTo('products')}
            >
                Explore Products
            </motion.button>
            
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary font-medium py-3 px-8 rounded-full text-lg hover:bg-light transition-colors"
                onClick={scrollToProducts}
            >
                Featured Items
            </motion.button>
        </motion.div>
    </div>
</section>

            {/* About Section */}
           <section className="py-16 bg-light overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">
              About Vishnu Hast Kala Kendra
            </h2>
            <p className="text-gray-600 mb-6">
              Vishnu Hastkala Kendra is a premier marble moorti (idol) and idol manufacturer located in Bhedaghat, Jabalpur, Madhya Pradesh, India...
            </p>
            <p className="text-gray-600 mb-6">
              With years of experience and a team of skilled artisans, we create masterpieces that blend traditional craftsmanship with contemporary aesthetics...
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white font-medium py-3 px-8 rounded-full hover:bg-accent transition-colors"
              onClick={() => navigateTo('about')}
            >
              Learn More
            </motion.button>
          </motion.div>

          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full">
              <img 
                src="https://res.cloudinary.com/bazeercloud/image/upload/v1751267519/WhatsApp_Image_2025-06-30_at_12.28.19_PM_sowywf.jpg" 
                alt="Artisan crafting marble statue"
                className="rounded-lg shadow-xl w-full object-cover"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <p className="text-primary font-bold">Since 1985</p>
                <p className="text-gray-600">Crafting Excellence</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
            
            {/* Featured Products Section */}
            <section ref={featuredProductsRef} className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <motion.h2 
                            className="text-3xl md:text-4xl font-bold text-dark mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            Featured Products
                        </motion.h2>
                        <motion.p 
                            className="text-gray-600 max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Discover the timeless beauty of marble with our exquisite collection of statues. Each piece is meticulously crafted to capture the essence of artistry and elegance.
                        </motion.p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product, index) => (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                navigateTo={navigateTo}
                            />
                        ))}
                    </div>
                    
                    <div className="text-center mt-12">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-primary text-white font-medium py-3 px-8 rounded-full hover:bg-accent transition-colors"
                            onClick={() => navigateTo('products')}
                        >
                            View All Products
                        </motion.button>
                    </div>
                </div>
            </section>
            
            {/* Services Section */}
            <section className="py-16 bg-dark text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <motion.h2 
                            className="text-3xl md:text-4xl font-bold mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            Our Services
                        </motion.h2>
                        <motion.p 
                            className="text-gray-300 max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            We offer a wide range of services to meet your needs. From custom marble statues to stone carvings, we have you covered.
                        </motion.p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <motion.div 
                            className="bg-gray-800 p-6 rounded-lg"
                            whileHover={{ y: -10 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="bg-primary p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Custom Marble Statues</h3>
                            <p className="text-gray-300">
                                We create custom marble statues tailored to your specific requirements. Our skilled artisans bring your vision to life with precision and artistry.
                            </p>
                        </motion.div>
                        
                        <motion.div 
                            className="bg-gray-800 p-6 rounded-lg"
                            whileHover={{ y: -10 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="bg-primary p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Marble Contractor Services</h3>
                            <p className="text-gray-300">
                                We provide comprehensive marble contractor services for residential and commercial projects. From selection to installation, we ensure a seamless experience.
                            </p>
                        </motion.div>
                        
                        <motion.div 
                            className="bg-gray-800 p-6 rounded-lg"
                            whileHover={{ y: -10 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <div className="bg-primary p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Restoration & Repair</h3>
                            <p className="text-gray-300">
                                We offer expert restoration and repair services for damaged marble statues and artifacts. Our team can restore your precious pieces to their original glory.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
            
            {/* Testimonials Section */}
            <section className="py-16 bg-light">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <motion.h2 
                            className="text-3xl md:text-4xl font-bold text-dark mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            What Our Customers Say
                        </motion.h2>
                        <motion.p 
                            className="text-gray-600 max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Don't just take our word for it. Here's what our satisfied customers have to say about our products and services.
                        </motion.p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <TestimonialCard 
                                key={testimonial.id} 
                                testimonial={testimonial} 
                            />
                        ))}
                    </div>
                </div>
            </section>
            
            {/* CTA Section */}
            <section className="py-16 bg-primary text-white">
                <div className="container mx-auto px-4 text-center">
                    <motion.h2 
                        className="text-3xl md:text-4xl font-bold mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Ready to Transform Your Space?
                    </motion.h2>
                    <motion.p 
                        className="text-xl mb-8 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Contact us today to discuss your requirements and bring your vision to life.
                    </motion.p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-primary font-medium py-3 px-8 rounded-full text-lg hover:bg-light transition-colors"
                        onClick={() => navigateTo('contact')}
                    >
                        Contact Us Now
                    </motion.button>
                </div>
            </section>
        </div>
    );
};