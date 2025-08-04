// Navbar.js - Navigation component

import React, { useState, useEffect } from "react";

import { motion } from 'framer-motion';


const Navbar = ({ currentPage, navigateTo }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // Handle scroll event to change navbar appearance
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    // Navigation items
    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About Us' },
        { id: 'products', label: 'Products' },
        { id: 'blog', label: 'Blog' },
        { id: 'contact', label: 'Contact' }
    ];
    
    return (
        <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigateTo('home')}
                        className="cursor-pointer"
                    >
                        <h1 className={`font-bold text-2xl md:text-3xl ${isScrolled ? 'text-primary' : 'text-white text-shadow'}`}>
                            Vishnu Hast Kala
                        </h1>
                    </motion.div>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-6">
                        {navItems.map((item) => (
                            <motion.button
                                key={item.id}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigateTo(item.id)}
                                className={`font-medium ${currentPage === item.id ? 'text-primary' : isScrolled ? 'text-dark hover:text-primary' : 'text-white hover:text-primary text-shadow'}`}
                            >
                                {item.label}
                            </motion.button>
                        ))}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigateTo('dashboard')}
                            className={`font-medium px-4 py-2 rounded-full ${isScrolled ? 'bg-primary text-white' : 'bg-white text-primary'}`}
                        >
                            Dashboard
                        </motion.button>
                    </nav>
                    
                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`p-2 focus:outline-none ${isScrolled ? 'text-dark' : 'text-white'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
                
                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden mt-4 bg-white rounded-lg shadow-lg overflow-hidden"
                    >
                        <div className="flex flex-col py-2">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        navigateTo(item.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`py-3 px-4 text-left ${currentPage === item.id ? 'text-primary font-medium' : 'text-dark'}`}
                                >
                                    {item.label}
                                </button>
                            ))}
                            <button
                                onClick={() => {
                                    navigateTo('dashboard');
                                    setIsMobileMenuOpen(false);
                                }}
                                className="py-3 px-4 text-left bg-primary text-white mt-2"
                            >
                                Dashboard
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </header>
    );
};

export default Navbar;