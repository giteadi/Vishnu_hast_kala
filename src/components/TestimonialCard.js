// TestimonialCard.js - Component for displaying testimonials

const { motion } = Motion;

const TestimonialCard = ({ testimonial }) => {
    return (
        <motion.div 
            className="bg-white p-6 rounded-lg shadow-lg h-full flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
        >
            <div className="flex-grow">
                <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                        <svg 
                            key={i} 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'}`} 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>
                
                <div className="mb-4">
                    <svg className="h-8 w-8 text-primary opacity-50" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                </div>
                
                <p className="text-gray-600 italic mb-6">{testimonial.text}</p>
            </div>
            
            <div className="flex items-center">
                <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                    <h4 className="font-bold text-dark">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
            </div>
        </motion.div>
    );
};