// App.js - Main application component with routing

const { useState, useEffect } = React;
const { motion, AnimatePresence } = Motion;

const App = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        
        return () => clearTimeout(timer);
    }, []);
    
    // Handle navigation
    const navigateTo = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };
    
    // Loading screen
    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-dark">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <h1 className="text-4xl font-bold text-primary mb-4">Vishnu Hast Kala Kendra</h1>
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                </motion.div>
            </div>
        );
    }
    
    // Render the current page
    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <Home navigateTo={navigateTo} />;
            case 'about':
                return <About navigateTo={navigateTo} />;
            case 'products':
                return <Products navigateTo={navigateTo} />;
            case 'blog':
                return <Blog navigateTo={navigateTo} />;
            case 'contact':
                return <Contact navigateTo={navigateTo} />;
            case 'dashboard':
                return <Dashboard navigateTo={navigateTo} />;
            default:
                return <Home navigateTo={navigateTo} />;
        }
    };
    
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar currentPage={currentPage} navigateTo={navigateTo} />
            
            <AnimatePresence mode="wait">
                <motion.main 
                    key={currentPage}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex-grow"
                >
                    {renderPage()}
                </motion.main>
            </AnimatePresence>
            
            <Footer navigateTo={navigateTo} />
        </div>
    );
};