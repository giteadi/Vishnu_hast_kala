// Products.js - Products page component

const { useState, useEffect } = React;
const { motion } = Motion;

const Products = ({ navigateTo }) => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    
    // Product categories
    const categories = [
        { id: 'all', name: 'All Products' },
        { id: 'statues', name: 'Marble Statues' },
        { id: 'idols', name: 'Stone Idols' },
        { id: 'busts', name: 'Custom Busts' },
        { id: 'religious', name: 'Religious Items' },
        { id: 'handicrafts', name: 'Handicrafts' }
    ];
    
    // Sample products data
    const products = [
        {
            id: 1,
            name: 'Marble Ganesh Statue',
            image: './assets/images/product1.jpg',
            shortDescription: 'Beautifully crafted white marble Ganesh statue with intricate detailing.',
            price: '12,500',
            category: 'statues',
            isNew: true
        },
        {
            id: 2,
            name: 'Radha Krishna Idol',
            image: './assets/images/product2.jpg',
            shortDescription: 'Elegant Radha Krishna marble statue, perfect for home temples.',
            price: '18,900',
            category: 'statues',
            isNew: false
        },
        {
            id: 3,
            name: 'Peacock Sankh',
            image: './assets/images/product3.jpg',
            shortDescription: 'Intricately carved marble sankh with peacock design for sacred rituals.',
            price: '8,500',
            category: 'religious',
            isNew: true
        },
        {
            id: 4,
            name: 'Custom Marble Bust',
            image: './assets/images/product4.jpg',
            shortDescription: 'Personalized marble busts crafted with precision and artistry.',
            price: null, // Price on request
            category: 'busts',
            isNew: false
        },
        {
            id: 5,
            name: 'Lord Shiva Statue',
            image: './assets/images/product5.jpg',
            shortDescription: 'Majestic Lord Shiva statue carved from high-quality white marble.',
            price: '22,500',
            category: 'statues',
            isNew: false
        },
        {
            id: 6,
            name: 'Marble Lakshmi Statue',
            image: './assets/images/product6.jpg',
            shortDescription: 'Beautiful Goddess Lakshmi statue with gold-painted accents.',
            price: '15,800',
            category: 'statues',
            isNew: true
        },
        {
            id: 7,
            name: 'Stone Nandi Bull',
            image: './assets/images/product7.jpg',
            shortDescription: 'Traditional Nandi Bull carved from durable stone, ideal for temples.',
            price: '14,200',
            category: 'idols',
            isNew: false
        },
        {
            id: 8,
            name: 'Marble Pooja Thali',
            image: './assets/images/product8.jpg',
            shortDescription: 'Elegant marble pooja thali with intricate designs for daily rituals.',
            price: '3,500',
            category: 'religious',
            isNew: false
        },
        {
            id: 9,
            name: 'Decorative Elephant Pair',
            image: './assets/images/product9.jpg',
            shortDescription: 'Pair of decorative marble elephants, perfect for home décor.',
            price: '7,800',
            category: 'handicrafts',
            isNew: true
        },
        {
            id: 10,
            name: 'Marble Saraswati Idol',
            image: './assets/images/product10.jpg',
            shortDescription: 'Exquisite Goddess Saraswati statue with detailed features.',
            price: '16,500',
            category: 'statues',
            isNew: false
        },
        {
            id: 11,
            name: 'Custom Family Portrait',
            image: './assets/images/product11.jpg',
            shortDescription: 'Custom marble relief portrait of your family, hand-carved by our artisans.',
            price: null, // Price on request
            category: 'busts',
            isNew: true
        },
        {
            id: 12,
            name: 'Marble Diya Stand',
            image: './assets/images/product12.jpg',
            shortDescription: 'Beautifully designed marble diya stand for festive occasions.',
            price: '2,800',
            category: 'religious',
            isNew: false
        }
    ];
    
    // Filter products based on category and search query
    useEffect(() => {
        let result = products;
        
        // Filter by category
        if (selectedCategory !== 'all') {
            result = result.filter(product => product.category === selectedCategory);
        }
        
        // Filter by search query
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            result = result.filter(product => 
                product.name.toLowerCase().includes(query) || 
                product.shortDescription.toLowerCase().includes(query)
            );
        }
        
        setFilteredProducts(result);
    }, [selectedCategory, searchQuery]);
    
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
                            Our Products
                        </motion.h1>
                        <motion.p 
                            className="text-xl text-gray-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Discover our exquisite collection of handcrafted marble and stone creations
                        </motion.p>
                    </div>
                </div>
            </section>
            
            {/* Products Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {/* Search and Filter */}
                    <div className="mb-12">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            {/* Categories */}
                            <div className="flex flex-wrap gap-3">
                                {categories.map(category => (
                                    <motion.button
                                        key={category.id}
                                        className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === category.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
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
                                        placeholder="Search products..."
                                        className="w-full md:w-64 px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Products Grid */}
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredProducts.map((product) => (
                                <ProductCard 
                                    key={product.id} 
                                    product={product} 
                                    navigateTo={navigateTo}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-xl font-bold text-gray-700 mb-2">No products found</h3>
                            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                            <button 
                                className="mt-4 text-primary font-medium hover:underline"
                                onClick={() => {
                                    setSelectedCategory('all');
                                    setSearchQuery('');
                                }}
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
            </section>
            
            {/* Custom Order Section */}
            <section className="py-16 bg-light">
                <div className="container mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/2">
                                <img 
                                    src="./assets/images/custom-order.jpg" 
                                    alt="Custom marble statue"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                                <motion.h2 
                                    className="text-3xl font-bold text-dark mb-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                >
                                    Can't Find What You're Looking For?
                                </motion.h2>
                                <motion.p 
                                    className="text-gray-600 mb-6"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    We specialize in custom orders tailored to your specific requirements. Whether you need a particular deity statue, a custom bust, or a unique marble artifact, our skilled artisans can bring your vision to life.
                                </motion.p>
                                <motion.p 
                                    className="text-gray-600 mb-8"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    Contact us today to discuss your custom order requirements and get a personalized quote.
                                </motion.p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-primary text-white font-medium py-3 px-8 rounded-full hover:bg-accent transition-colors self-start"
                                    onClick={() => navigateTo('contact')}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    Request Custom Order
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Shipping & Care Section */}
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
                            Shipping & Product Care
                        </motion.h2>
                        <motion.p 
                            className="text-gray-600 max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Information about our shipping process and how to care for your marble products
                        </motion.p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div 
                            className="bg-white p-6 rounded-lg shadow-lg"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-xl font-bold text-dark mb-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                                </svg>
                                Shipping Information
                            </h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>We ship our products across India and internationally.</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Each product is carefully packed with protective materials to ensure safe delivery.</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Domestic shipping typically takes 5-7 business days, while international shipping may take 10-15 business days.</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>For large or custom orders, shipping times may vary. We will provide you with a specific timeline during the ordering process.</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Shipping costs are calculated based on the product weight, dimensions, and delivery location.</span>
                                </li>
                            </ul>
                        </motion.div>
                        
                        <motion.div 
                            className="bg-white p-6 rounded-lg shadow-lg"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-xl font-bold text-dark mb-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                Product Care
                            </h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Clean your marble products gently with a soft, damp cloth. Avoid using harsh chemicals or abrasive cleaners.</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>For deeper cleaning, use a mild soap solution and rinse thoroughly with water.</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Keep marble products away from acidic substances like lemon juice, vinegar, or tomato sauce, as they can etch the surface.</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Apply a marble sealer once a year to protect the surface from stains and moisture.</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Handle your marble products with care to avoid chips or cracks. Use both hands when moving them.</span>
                                </li>
                            </ul>
                        </motion.div>
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
                        Have Questions About Our Products?
                    </motion.h2>
                    <motion.p 
                        className="text-xl mb-8 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Our team is here to help you find the perfect piece for your home, temple, or special occasion.
                    </motion.p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-primary font-medium py-3 px-8 rounded-full text-lg hover:bg-light transition-colors"
                        onClick={() => navigateTo('contact')}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        Contact Us Now
                    </motion.button>
                </div>
            </section>
        </div>
    );
};