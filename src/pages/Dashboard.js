// Dashboard.js - Admin dashboard component

const { useState } = React;
const { motion } = Motion;

const Dashboard = () => {
    // Authentication state
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    
    // Dashboard state
    const [activeTab, setActiveTab] = useState('overview');
    
    // Mock data for dashboard
    const dashboardData = {
        overview: {
            totalProducts: 48,
            totalOrders: 124,
            pendingOrders: 12,
            totalRevenue: '₹8,45,600',
            recentActivity: [
                { id: 1, type: 'order', message: 'New order #1089 received', time: '2 hours ago' },
                { id: 2, type: 'product', message: 'Product "Marble Ganesh Statue" updated', time: '5 hours ago' },
                { id: 3, type: 'inquiry', message: 'New inquiry from Rahul Sharma', time: '1 day ago' },
                { id: 4, type: 'order', message: 'Order #1088 marked as shipped', time: '1 day ago' },
                { id: 5, type: 'product', message: 'New product "Custom Marble Bust" added', time: '2 days ago' }
            ]
        },
        products: [
            { id: 1, name: 'Marble Ganesh Statue', category: 'statues', price: '₹12,500', stock: 8, status: 'Active' },
            { id: 2, name: 'Radha Krishna Idol', category: 'statues', price: '₹18,900', stock: 5, status: 'Active' },
            { id: 3, name: 'Peacock Sankh', category: 'religious', price: '₹8,500', stock: 12, status: 'Active' },
            { id: 4, name: 'Custom Marble Bust', category: 'busts', price: 'Custom', stock: 'Made to order', status: 'Active' },
            { id: 5, name: 'Lord Shiva Statue', category: 'statues', price: '₹22,500', stock: 3, status: 'Active' },
            { id: 6, name: 'Marble Lakshmi Statue', category: 'statues', price: '₹15,800', stock: 0, status: 'Out of Stock' },
            { id: 7, name: 'Stone Nandi Bull', category: 'idols', price: '₹14,200', stock: 4, status: 'Active' },
            { id: 8, name: 'Marble Pooja Thali', category: 'religious', price: '₹3,500', stock: 15, status: 'Active' }
        ],
        orders: [
            { id: 1089, customer: 'Amit Patel', date: '2023-09-15', items: 2, total: '₹31,400', status: 'Pending' },
            { id: 1088, customer: 'Priya Sharma', date: '2023-09-14', items: 1, total: '₹12,500', status: 'Shipped' },
            { id: 1087, customer: 'Rajesh Kumar', date: '2023-09-12', items: 3, total: '₹26,800', status: 'Delivered' },
            { id: 1086, customer: 'Sunita Verma', date: '2023-09-10', items: 1, total: '₹22,500', status: 'Delivered' },
            { id: 1085, customer: 'Vikram Singh', date: '2023-09-08', items: 2, total: '₹17,700', status: 'Delivered' }
        ],
        inquiries: [
            { id: 1, name: 'Rahul Sharma', email: 'rahul.s@example.com', phone: '+91 98765 43210', subject: 'Custom Shiva Statue Inquiry', message: 'I am interested in commissioning a custom Shiva statue for our temple. Could you please provide details about the process, timeline, and approximate cost?', date: '2023-09-15', status: 'New' },
            { id: 2, name: 'Meera Joshi', email: 'meera.j@example.com', phone: '+91 87654 32109', subject: 'Bulk Order for Wedding Favors', message: 'We are planning to order 50 small marble Ganesh statues as wedding favors. Do you offer bulk discounts? What would be the lead time for such an order?', date: '2023-09-13', status: 'Responded' },
            { id: 3, name: 'Arjun Nair', email: 'arjun.n@example.com', phone: '+91 76543 21098', subject: 'International Shipping Query', message: 'I\'m based in Singapore and interested in purchasing several pieces. Do you ship internationally? What would be the shipping cost and estimated delivery time?', date: '2023-09-10', status: 'Resolved' },
            { id: 4, name: 'Kavita Reddy', email: 'kavita.r@example.com', phone: '+91 65432 10987', subject: 'Restoration Services', message: 'I have an antique marble statue that needs restoration. Do you offer such services? I\'d like to bring it in for assessment.', date: '2023-09-08', status: 'New' }
        ],
        blog: [
            { id: 1, title: 'The Ancient Art of Marble Carving in India', status: 'Published', date: '2023-08-15', author: 'Rajesh Kumar', comments: 12 },
            { id: 2, title: 'How to Care for Your Marble Statues', status: 'Published', date: '2023-07-22', author: 'Priya Sharma', comments: 8 },
            { id: 3, title: 'The Symbolism Behind Hindu Deities in Sculpture', status: 'Published', date: '2023-06-30', author: 'Dr. Anand Mishra', comments: 15 },
            { id: 4, title: 'Upcoming Exhibition: Divine Forms in Marble', status: 'Published', date: '2023-09-05', author: 'Meera Joshi', comments: 3 },
            { id: 5, title: 'Traditional vs Modern Sculpting Techniques', status: 'Draft', date: 'N/A', author: 'Vikram Patel', comments: 0 }
        ]
    };
    
    // Handle login
    const handleLogin = (e) => {
        e.preventDefault();
        // Simple mock authentication (in a real app, this would be a secure authentication system)
        if (username === 'admin' && password === 'password') {
            setIsAuthenticated(true);
            setLoginError('');
        } else {
            setLoginError('Invalid username or password');
        }
    };
    
    // Handle logout
    const handleLogout = () => {
        setIsAuthenticated(false);
        setUsername('');
        setPassword('');
    };
    
    // If not authenticated, show login form
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-light py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="bg-primary py-4 px-6">
                            <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
                            <p className="text-white opacity-80">Login to access the dashboard</p>
                        </div>
                        
                        <form className="py-6 px-8" onSubmit={handleLogin}>
                            {loginError && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                    {loginError}
                                </div>
                            )}
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                    Username
                                </label>
                                <input 
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
                                    id="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input 
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-primary text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    type="submit"
                                >
                                    Sign In
                                </motion.button>
                                <a className="inline-block align-baseline font-bold text-sm text-primary hover:text-accent" href="#">
                                    Forgot Password?
                                </a>
                            </div>
                            
                            <div className="mt-6 text-center text-sm text-gray-500">
                                <p>For demo purposes, use:</p>
                                <p className="font-medium">Username: admin | Password: password</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    
    // Dashboard UI when authenticated
    return (
        <div className="min-h-screen bg-light">
            {/* Dashboard Header */}
            <header className="bg-primary text-white py-4 px-6 shadow-md">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Vishnu Hastkala Kendra - Admin Dashboard</h1>
                        <div className="flex items-center space-x-4">
                            <div className="text-sm">
                                <span className="opacity-80">Logged in as</span>
                                <span className="ml-1 font-medium">Administrator</span>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-primary font-medium py-1 px-4 rounded-full text-sm hover:bg-gray-100 transition-colors"
                                onClick={handleLogout}
                            >
                                Logout
                            </motion.button>
                        </div>
                    </div>
                </div>
            </header>
            
            {/* Dashboard Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <div className="md:w-1/4 lg:w-1/5">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <nav className="p-4">
                                <ul className="space-y-2">
                                    <li>
                                        <button 
                                            className={`w-full text-left px-4 py-2 rounded-md flex items-center ${activeTab === 'overview' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                                            onClick={() => setActiveTab('overview')}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                            </svg>
                                            Overview
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            className={`w-full text-left px-4 py-2 rounded-md flex items-center ${activeTab === 'products' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                                            onClick={() => setActiveTab('products')}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                            Products
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            className={`w-full text-left px-4 py-2 rounded-md flex items-center ${activeTab === 'orders' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                                            onClick={() => setActiveTab('orders')}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                            Orders
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            className={`w-full text-left px-4 py-2 rounded-md flex items-center ${activeTab === 'inquiries' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                                            onClick={() => setActiveTab('inquiries')}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                            </svg>
                                            Inquiries
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            className={`w-full text-left px-4 py-2 rounded-md flex items-center ${activeTab === 'blog' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                                            onClick={() => setActiveTab('blog')}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                            </svg>
                                            Blog
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            className={`w-full text-left px-4 py-2 rounded-md flex items-center ${activeTab === 'settings' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                                            onClick={() => setActiveTab('settings')}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Settings
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    
                    {/* Main Content */}
                    <div className="md:w-3/4 lg:w-4/5">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div>
                                <h2 className="text-2xl font-bold text-dark mb-6">Dashboard Overview</h2>
                                
                                {/* Stats Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                    <StatsCard 
                                        title="Total Products" 
                                        value={dashboardData.overview.totalProducts} 
                                        icon={(
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                        )}
                                        color="bg-blue-500"
                                    />
                                    
                                    <StatsCard 
                                        title="Total Orders" 
                                        value={dashboardData.overview.totalOrders} 
                                        icon={(
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                        )}
                                        color="bg-green-500"
                                    />
                                    
                                    <StatsCard 
                                        title="Pending Orders" 
                                        value={dashboardData.overview.pendingOrders} 
                                        icon={(
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        )}
                                        color="bg-yellow-500"
                                    />
                                    
                                    <StatsCard 
                                        title="Total Revenue" 
                                        value={dashboardData.overview.totalRevenue} 
                                        icon={(
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        )}
                                        color="bg-purple-500"
                                    />
                                </div>
                                
                                {/* Recent Activity */}
                                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                                    <div className="px-6 py-4 border-b border-gray-200">
                                        <h3 className="text-lg font-bold text-dark">Recent Activity</h3>
                                    </div>
                                    <div className="p-6">
                                        <ul className="divide-y divide-gray-200">
                                            {dashboardData.overview.recentActivity.map((activity) => (
                                                <li key={activity.id} className="py-3 flex items-start">
                                                    <div className={`p-2 rounded-full mr-4 ${activity.type === 'order' ? 'bg-green-100 text-green-600' : activity.type === 'product' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                                        {activity.type === 'order' ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                            </svg>
                                                        ) : activity.type === 'product' ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                            </svg>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-gray-800">{activity.message}</p>
                                                        <p className="text-sm text-gray-500">{activity.time}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                
                                {/* Quick Actions */}
                                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="px-6 py-4 border-b border-gray-200">
                                        <h3 className="text-lg font-bold text-dark">Quick Actions</h3>
                                    </div>
                                    <div className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <motion.button
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="bg-blue-50 hover:bg-blue-100 text-blue-700 p-4 rounded-lg flex flex-col items-center justify-center transition-colors"
                                                onClick={() => setActiveTab('products')}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                                <span className="font-medium">Add New Product</span>
                                            </motion.button>
                                            
                                            <motion.button
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="bg-green-50 hover:bg-green-100 text-green-700 p-4 rounded-lg flex flex-col items-center justify-center transition-colors"
                                                onClick={() => setActiveTab('orders')}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                                <span className="font-medium">Manage Orders</span>
                                            </motion.button>
                                            
                                            <motion.button
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="bg-purple-50 hover:bg-purple-100 text-purple-700 p-4 rounded-lg flex flex-col items-center justify-center transition-colors"
                                                onClick={() => setActiveTab('blog')}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                <span className="font-medium">Create Blog Post</span>
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Products Tab */}
                        {activeTab === 'products' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-dark">Products Management</h2>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-primary text-white font-medium py-2 px-4 rounded-md flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Add New Product
                                    </motion.button>
                                </div>
                                
                                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                                            <div className="w-full md:w-auto mb-4 md:mb-0">
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        placeholder="Search products..."
                                                        className="w-full md:w-64 px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                                    />
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                                                    <option value="">All Categories</option>
                                                    <option value="statues">Statues</option>
                                                    <option value="idols">Idols</option>
                                                    <option value="busts">Busts</option>
                                                    <option value="religious">Religious Items</option>
                                                </select>
                                                <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                                                    <option value="">All Status</option>
                                                    <option value="active">Active</option>
                                                    <option value="out_of_stock">Out of Stock</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {dashboardData.products.map((product) => (
                                                        <tr key={product.id}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                                    {product.category}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.price}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                                    {product.status}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                <div className="flex space-x-2">
                                                                    <button className="text-indigo-600 hover:text-indigo-900">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                        </svg>
                                                                    </button>
                                                                    <button className="text-red-600 hover:text-red-900">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        
                                        <div className="flex justify-between items-center mt-6">
                                            <div className="text-sm text-gray-500">
                                                Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of <span className="font-medium">48</span> products
                                            </div>
                                            <div className="flex space-x-2">
                                                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                                    Previous
                                                </button>
                                                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-white bg-primary hover:bg-accent">
                                                    1
                                                </button>
                                                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                                    2
                                                </button>
                                                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                                    3
                                                </button>
                                                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Orders Tab */}
                        {activeTab === 'orders' && (
                            <div>
                                <h2 className="text-2xl font-bold text-dark mb-6">Orders Management</h2>
                                
                                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                                            <div className="w-full md:w-auto mb-4 md:mb-0">
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        placeholder="Search orders..."
                                                        className="w-full md:w-64 px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                                    />
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div>
                                                <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                                                    <option value="">All Status</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {dashboardData.orders.map((order) => (
                                                        <tr key={order.id}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.total}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                                                    {order.status}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                <div className="flex space-x-2">
                                                                    <button className="text-indigo-600 hover:text-indigo-900">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                        </svg>
                                                                    </button>
                                                                    <button className="text-indigo-600 hover:text-indigo-900">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                        </svg>
                                                                    </button>
                                                                    <button className="text-red-600 hover:text-red-900">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Inquiries Tab */}
                        {activeTab === 'inquiries' && (
                            <div>
                                <h2 className="text-2xl font-bold text-dark mb-6">Customer Inquiries</h2>
                                
                                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                                            <div className="w-full md:w-auto mb-4 md:mb-0">
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        placeholder="Search inquiries..."
                                                        className="w-full md:w-64 px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                                    />
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div>
                                                <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                                                    <option value="">All Status</option>
                                                    <option value="new">New</option>
                                                    <option value="responded">Responded</option>
                                                    <option value="resolved">Resolved</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            {dashboardData.inquiries.map((inquiry) => (
                                                <div key={inquiry.id} className="border border-gray-200 rounded-lg p-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <h3 className="text-lg font-bold text-dark">{inquiry.subject}</h3>
                                                            <p className="text-sm text-gray-500">From: {inquiry.name} ({inquiry.email})</p>
                                                        </div>
                                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${inquiry.status === 'New' ? 'bg-yellow-100 text-yellow-800' : inquiry.status === 'Responded' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                                            {inquiry.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-700 mb-3">{inquiry.message}</p>
                                                    <div className="flex justify-between items-center text-sm">
                                                        <span className="text-gray-500">Received: {inquiry.date}</span>
                                                        <div className="flex space-x-2">
                                                            <button className="text-primary hover:text-accent font-medium">Reply</button>
                                                            <button className="text-gray-600 hover:text-gray-900 font-medium">Mark as Resolved</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Blog Tab */}
                        {activeTab === 'blog' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-dark">Blog Management</h2>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-primary text-white font-medium py-2 px-4 rounded-md flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Create New Post
                                    </motion.button>
                                </div>
                                
                                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="p-6">
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {dashboardData.blog.map((post) => (
                                                        <tr key={post.id}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.id}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm font-medium text-gray-900">{post.title}</div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.author}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.date}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.comments}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                                    {post.status}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                <div className="flex space-x-2">
                                                                    <button className="text-indigo-600 hover:text-indigo-900">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                        </svg>
                                                                    </button>
                                                                    <button className="text-indigo-600 hover:text-indigo-900">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                        </svg>
                                                                    </button>
                                                                    <button className="text-red-600 hover:text-red-900">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Stats Card Component for Dashboard
const StatsCard = ({ title, value, icon, color }) => {
    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
        >
            <div className="p-5">
                <div className="flex items-center">
                    <div className={`rounded-full p-3 ${color} text-white mr-4`}>
                        {icon}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-dark">{value}</h3>
                        <p className="text-gray-500">{title}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};