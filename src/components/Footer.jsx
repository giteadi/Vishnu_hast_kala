import { motion } from 'framer-motion';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path);
    };

    return (
        <motion.footer
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative bg-white/10 backdrop-blur-md text-yellow-400 pt-12 pb-6 border-t border-yellow-500/20"
        >
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-xl font-bold text-yellow-300 mb-4">Vishnu Hast Kala Kendra</h3>
                        <p className="mb-4 text-black">Premium marble moorti (idol) and idol manufacturer specializing in handcrafted Hindu marble statues, stone carvings, and custom busts.</p>
                        <div className="flex space-x-4">
                            <motion.a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2 }}
                                className="text-yellow-400 hover:text-blue-500"
                            >
                                <Facebook size={24} />
                            </motion.a>
                            <motion.a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2 }}
                                className="text-yellow-400 hover:text-pink-500"
                            >
                                <Instagram size={24} />
                            </motion.a>
                            <motion.a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2 }}
                                className="text-yellow-400 hover:text-red-600"
                            >
                                <Youtube size={24} />
                            </motion.a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold text-yellow-300 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {['/', '/about', '/products', '/blog', '/contact'].map((path, i) => (
                                <li key={i}>
                                    <button
                                        onClick={() => navigateTo(path)}
                                        className="text-black hover:text-yellow-500 transition-colors"
                                    >
                                        {['Home', 'About Us', 'Products', 'Blog', 'Contact Us'][i]}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products */}
                    <div>
                        <h3 className="text-xl font-bold text-yellow-300 mb-4">Our Products</h3>
                        <ul className="space-y-2">
                            {[
                                'Marble Statues (Moorti)',
                                'Stone Idols',
                                'Custom Busts',
                                'Religious Goods',
                                'Handicrafts',
                            ].map((product, i) => (
                                <li key={i}>
                                    <button
                                        onClick={() => navigateTo('/products')}
                                        className="text-black hover:text-yellow-500 transition-colors"
                                    >
                                        {product}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold text-yellow-300 mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-black">
                            <li className="flex items-start">
                                <MapPin className="h-6 w-6 mr-2 text-yellow-400" />
                                <span>Opposite of Chosath Yogini Mandir, Bhedaghat, MP 482003, India</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="h-6 w-6 mr-2 text-yellow-400" />
                                <span>+91 79745 07514</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="h-6 w-6 mr-2 text-yellow-400" />
                                <span>adityasharma10102000@gmail.com</span>
                            </li>
                            <li className="flex items-center">
                                <Clock className="h-6 w-6 mr-2 text-yellow-400" />
                                <span>Open daily: 9 AM - 10 PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-yellow-500/30 mt-10 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-black text-sm mb-4 md:mb-0">
                            &copy; {currentYear} Vishnu Hast Kala Kendra. All rights reserved.
                        </p>
                        <div className="flex space-x-4">
                            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((text, i) => (
                                <button key={i} className="text-black hover:text-yellow-500 text-sm transition">
                                    {text}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
