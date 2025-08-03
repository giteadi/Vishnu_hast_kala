// BlogPost.js - Component for displaying blog posts

const { motion } = Motion;

const BlogPost = ({ post, isDetailed = false, navigateTo }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };
    
    // For list view (summary)
    if (!isDetailed) {
        return (
            <motion.div 
                className="bg-white rounded-lg overflow-hidden shadow-lg h-full flex flex-col"
                whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="relative">
                    <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 bg-primary text-white px-4 py-2">
                        {formatDate(post.date)}
                    </div>
                </div>
                
                <div className="p-5 flex-grow flex flex-col">
                    <div className="flex items-center mb-3">
                        <img 
                            src={post.author.avatar} 
                            alt={post.author.name}
                            className="w-8 h-8 rounded-full mr-2"
                        />
                        <span className="text-gray-600 text-sm">{post.author.name}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-dark mb-3">{post.title}</h3>
                    
                    <p className="text-gray-600 mb-4 flex-grow">
                        {post.excerpt}
                    </p>
                    
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-primary font-medium flex items-center"
                        onClick={() => navigateTo('blog', { postId: post.id })}
                    >
                        Read More
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </motion.button>
                </div>
            </motion.div>
        );
    }
    
    // For detailed view (full post)
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="relative">
                <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-80 object-cover"
                />
                <div className="absolute bottom-0 left-0 bg-primary text-white px-4 py-2">
                    {formatDate(post.date)}
                </div>
            </div>
            
            <div className="p-6 md:p-8">
                <h1 className="text-3xl font-bold text-dark mb-4">{post.title}</h1>
                
                <div className="flex items-center mb-6 pb-6 border-b border-gray-200">
                    <img 
                        src={post.author.avatar} 
                        alt={post.author.name}
                        className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                        <h4 className="font-medium text-dark">{post.author.name}</h4>
                        <p className="text-gray-500 text-sm">{post.author.role}</p>
                    </div>
                </div>
                
                <div className="prose max-w-none">
                    {post.content.map((paragraph, index) => (
                        <p key={index} className="text-gray-700 mb-4">{paragraph}</p>
                    ))}
                </div>
                
                {post.tags && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <h4 className="font-bold text-dark mb-3">Tags:</h4>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag, index) => (
                                <span 
                                    key={index}
                                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="font-bold text-dark mb-4">Share this post:</h4>
                    <div className="flex space-x-4">
                        <motion.a 
                            href="#" 
                            whileHover={{ scale: 1.1, color: '#4267B2' }}
                            className="text-gray-500 hover:text-primary"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                            </svg>
                        </motion.a>
                        <motion.a 
                            href="#" 
                            whileHover={{ scale: 1.1, color: '#1DA1F2' }}
                            className="text-gray-500 hover:text-primary"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                        </motion.a>
                        <motion.a 
                            href="#" 
                            whileHover={{ scale: 1.1, color: '#0077B5' }}
                            className="text-gray-500 hover:text-primary"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                            </svg>
                        </motion.a>
                        <motion.a 
                            href="#" 
                            whileHover={{ scale: 1.1, color: '#E60023' }}
                            className="text-gray-500 hover:text-primary"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                            </svg>
                        </motion.a>
                    </div>
                </div>
                
                <div className="mt-8">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-primary text-white font-medium py-2 px-6 rounded-lg hover:bg-accent transition-colors"
                        onClick={() => navigateTo('blog')}
                    >
                        Back to Blog
                    </motion.button>
                </div>
            </div>
        </div>
    );
};