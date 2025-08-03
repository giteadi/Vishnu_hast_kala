// ProductCard.js - Component for displaying product items

const { useState } = React;
const { motion } = Motion;

const ProductCard = ({ product, navigateTo }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <motion.div 
            className="bg-white rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 h-full flex flex-col"
            whileHover={{ 
                y: -5,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative overflow-hidden">
                <motion.img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover"
                    animate={{
                        scale: isHovered ? 1.05 : 1
                    }}
                    transition={{ duration: 0.3 }}
                />
                {product.isNew && (
                    <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                        New
                    </div>
                )}
            </div>
            
            <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-dark mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{product.shortDescription}</p>
                
                <div className="flex justify-between items-center">
                    <span className="text-primary font-bold text-lg">
                        {product.price ? `₹${product.price}` : 'Price on request'}
                    </span>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-primary text-white px-4 py-2 rounded-full font-medium text-sm"
                        onClick={() => navigateTo('contact')}
                    >
                        Enquire Now
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};