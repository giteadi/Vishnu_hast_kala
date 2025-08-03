// About.js - About page component

const { motion } = Motion;

const About = ({ navigateTo }) => {
    // Team members data
    const teamMembers = [
        {
            id: 1,
            name: 'Aditya Sharma',
            role: 'Founder & Master Craftsman',
            image: './assets/images/team1.jpg',
            bio: 'With over 20 years of experience in marble craftsmanship, Aditya leads our team with passion and expertise.'
        },
        {
            id: 2,
            name: 'Rajesh Kumar',
            role: 'Senior Artisan',
            image: './assets/images/team2.jpg',
            bio: 'Rajesh specializes in intricate detailing and has been creating masterpieces for more than 15 years.'
        },
        {
            id: 3,
            name: 'Priya Verma',
            role: 'Design Specialist',
            image: './assets/images/team3.jpg',
            bio: 'Priya brings contemporary design sensibilities to our traditional craft, creating unique and modern pieces.'
        },
        {
            id: 4,
            name: 'Vikram Singh',
            role: 'Production Manager',
            image: './assets/images/team4.jpg',
            bio: 'Vikram ensures that all our products meet the highest quality standards before they reach our customers.'
        }
    ];
    
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
                            About Vishnu Hast Kala Kendra
                        </motion.h1>
                        <motion.p 
                            className="text-xl text-gray-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Crafting divine beauty in marble since 1985
                        </motion.p>
                    </div>
                </div>
            </section>
            
            {/* Our Story Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <motion.div 
                            className="md:w-1/2"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <img 
                                src="./assets/images/our-story.jpg" 
                                alt="Our workshop"
                                className="rounded-lg shadow-xl w-full"
                            />
                        </motion.div>
                        
                        <motion.div 
                            className="md:w-1/2"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl font-bold text-dark mb-6">Our Story</h2>
                            <p className="text-gray-600 mb-4">
                                Vishnu Hastkala Kendra was founded in 1985 by Mr. Vishnu Sharma, a master craftsman with a vision to preserve and promote the traditional art of marble sculpting. Located in the picturesque town of Bhedaghat, Jabalpur, our workshop draws inspiration from the natural beauty of the Narmada River and the magnificent marble rocks that surround it.
                            </p>
                            <p className="text-gray-600 mb-4">
                                What began as a small family business has now grown into a renowned establishment, recognized for its exceptional craftsmanship and dedication to quality. Today, the legacy continues under the leadership of Aditya Sharma, who has expanded the business while staying true to the traditional techniques and values established by his father.
                            </p>
                            <p className="text-gray-600">
                                Over the decades, we have had the privilege of creating exquisite marble statues and artifacts for temples, institutions, and private collectors across India and around the world. Our commitment to excellence and attention to detail has earned us a reputation as one of the finest marble craftsmen in the region.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
            
            {/* Our Mission & Values Section */}
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
                            Our Mission & Values
                        </motion.h2>
                        <motion.p 
                            className="text-gray-600 max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Guided by tradition, driven by innovation, and committed to excellence
                        </motion.p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div 
                            className="bg-white p-6 rounded-lg shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ y: -10, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                        >
                            <div className="bg-primary p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-dark mb-3">Our Mission</h3>
                            <p className="text-gray-600">
                                To preserve and promote the ancient art of marble craftsmanship while creating pieces that inspire devotion, admiration, and a deep appreciation for traditional Indian artistry. We aim to transform divine visions into tangible forms that enrich spaces and touch hearts.
                            </p>
                        </motion.div>
                        
                        <motion.div 
                            className="bg-white p-6 rounded-lg shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            whileHover={{ y: -10, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                        >
                            <div className="bg-primary p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-dark mb-3">Our Values</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span><strong>Craftsmanship:</strong> We uphold the highest standards of artistry and attention to detail.</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span><strong>Integrity:</strong> We conduct our business with honesty, transparency, and ethical practices.</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span><strong>Tradition:</strong> We honor and preserve traditional techniques passed down through generations.</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span><strong>Innovation:</strong> We embrace new ideas and techniques to enhance our craft.</span>
                                </li>
                            </ul>
                        </motion.div>
                        
                        <motion.div 
                            className="bg-white p-6 rounded-lg shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            whileHover={{ y: -10, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                        >
                            <div className="bg-primary p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-dark mb-3">Our Approach</h3>
                            <p className="text-gray-600">
                                We believe that each piece of marble holds within it a divine form waiting to be revealed. Our approach combines traditional hand-carving techniques with modern tools when necessary, ensuring that each creation is both authentic and durable. We work closely with our clients to understand their vision and bring it to life with precision and artistry.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
            
            {/* Our Process Section */}
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
                            Our Crafting Process
                        </motion.h2>
                        <motion.p 
                            className="text-gray-600 max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            From raw marble to divine masterpiece - our meticulous process ensures excellence at every step
                        </motion.p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <motion.div 
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                            <h3 className="text-xl font-bold text-dark mb-3">Selection</h3>
                            <p className="text-gray-600">
                                We carefully select the finest quality marble from trusted quarries, examining each piece for purity, strength, and character.
                            </p>
                        </motion.div>
                        
                        <motion.div 
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                            <h3 className="text-xl font-bold text-dark mb-3">Design</h3>
                            <p className="text-gray-600">
                                Our artists create detailed sketches and models based on traditional iconography or custom requirements, ensuring perfect proportions and aesthetics.
                            </p>
                        </motion.div>
                        
                        <motion.div 
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                            <h3 className="text-xl font-bold text-dark mb-3">Carving</h3>
                            <p className="text-gray-600">
                                Our master craftsmen use traditional techniques and tools to carve the marble, gradually revealing the form hidden within the stone.
                            </p>
                        </motion.div>
                        
                        <motion.div 
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
                            <h3 className="text-xl font-bold text-dark mb-3">Finishing</h3>
                            <p className="text-gray-600">
                                The final piece undergoes meticulous detailing, polishing, and quality checks to ensure a flawless finish that will last for generations.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
            
            {/* Our Team Section */}
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
                            Meet Our Team
                        </motion.h2>
                        <motion.p 
                            className="text-gray-600 max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            The skilled artisans and professionals behind our exquisite creations
                        </motion.p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <motion.div 
                                key={member.id}
                                className="bg-white rounded-lg overflow-hidden shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -10, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                            >
                                <img 
                                    src={member.image} 
                                    alt={member.name}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-dark mb-1">{member.name}</h3>
                                    <p className="text-primary font-medium mb-3">{member.role}</p>
                                    <p className="text-gray-600">{member.bio}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* CTA Section */}
            <section className="py-16 bg-primary text-white">
                <div className="container mx-auto px-4 text-center">
                    <motion.h2 
                        className="text-3xl font-bold mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Visit Our Workshop
                    </motion.h2>
                    <motion.p 
                        className="text-xl mb-8 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Experience the art of marble crafting firsthand. Visit our workshop in Bhedaghat, Jabalpur, and witness our artisans at work.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row justify-center gap-4"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-primary font-medium py-3 px-8 rounded-full text-lg hover:bg-light transition-colors"
                            onClick={() => navigateTo('contact')}
                        >
                            Contact Us
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-transparent border-2 border-white text-white font-medium py-3 px-8 rounded-full text-lg hover:bg-white hover:text-primary transition-colors"
                            onClick={() => navigateTo('products')}
                        >
                            View Our Products
                        </motion.button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};