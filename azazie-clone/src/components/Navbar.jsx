import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';

const Navbar = () => {
  const { cart, getCartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  
  const totalItems = getCartCount();

  // Handle search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (query.trim()) {
      const suggestions = productsData
        .filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.color.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5); // Show max 5 suggestions
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSuggestionClick = (product) => {
    setShowSuggestions(false);
    setSearchQuery('');
    navigate(`/product/${product.id}`);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container')) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Check if user is logged in
    const checkUser = () => {
      const user = localStorage.getItem('currentUser');
      if (user) {
        setCurrentUser(JSON.parse(user));
      } else {
        setCurrentUser(null);
      }
    };

    // Initial check
    checkUser();

    // Listen for storage changes
    const handleStorageChange = (e) => {
      // Handle both storage events and custom events
      setTimeout(checkUser, 100); // Small delay to ensure localStorage is updated
    };

    // Listen for storage events
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('storage-change', handleStorageChange);
    
    // Also listen for custom events
    window.addEventListener('userLogin', handleStorageChange);
    window.addEventListener('userLogout', handleStorageChange);

    // Check periodically for login changes (fallback)
    const interval = setInterval(checkUser, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('storage-change', handleStorageChange);
      window.removeEventListener('userLogin', handleStorageChange);
      window.removeEventListener('userLogout', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsAccountOpen(false);
    navigate('/products');
  };

  const getUserInitials = () => {
    if (!currentUser) return '';
    return currentUser.firstName.charAt(0).toUpperCase() + currentUser.lastName.charAt(0).toUpperCase();
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
     
      {/* Top Banner - New Users Deals */}
      <div className="bg-black text-white text-center py-1 sm:py-2 text-xs sm:text-sm flex justify-center items-center px-2">
        <span className="hidden xs:inline">New Users Deals: 10% Off And More!</span>
        <span className="xs:hidden">10% Off New Users!</span>
        <a href="#" className="underline ml-1 sm:ml-2 font-medium text-xs sm:text-sm">Get It Now</a>
      </div>

      <div className="px-2 sm:px-3 lg:px-4">
        {/* Main Navigation Row - Enhanced Responsive */}
        <div className="flex items-center justify-between h-12 sm:h-14 lg:h-16">
          {/* Logo and Main Categories */}
          <div className="flex items-center">
            {/* AZAZIE Logo - Responsive */}
            <div className="border border-gray-800 px-1.5 sm:px-2 lg:px-3 py-1 mr-1 sm:mr-2 lg:mr-3">
              <Link to="/" className="text-gray-800 text-xs sm:text-sm lg:text-base font-bold tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                AZAZIE
              </Link>
            </div>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex flex-col items-center justify-center w-5 h-5 sm:w-6 sm:h-6 space-y-0.5 sm:space-y-1 mr-1 sm:mr-2"
            >
              <span className={`block w-4 h-0.5 sm:w-5 bg-gray-800 transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-1 sm:translate-y-1.5' : ''}`}></span>
              <span className={`block w-4 h-0.5 sm:w-5 bg-gray-800 transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-4 h-0.5 sm:w-5 bg-gray-800 transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-1 sm:-translate-y-1.5' : ''}`}></span>
            </button>
            
            {/* Main Categories - Hidden on Mobile */}
            <div className="hidden xl:flex items-center">
              <div className="border border-gray-300 px-1.5 lg:px-2 py-1 mr-1 lg:mr-2">
                <Link to="/products?category=wedding" className="text-gray-700 text-xs lg:text-sm font-medium uppercase hover:text-pink-600">BRIDAL</Link>
              </div>
              <div className="border border-gray-300 px-1.5 lg:px-2 py-1 mr-1 lg:mr-2">
                <Link to="/products?category=formal" className="text-gray-700 text-xs lg:text-sm font-medium uppercase hover:text-pink-600">ATELIER</Link>
              </div>
              <div className="border border-gray-300 px-1.5 lg:px-2 py-1">
                <Link to="/products?category=suits" className="text-gray-700 text-xs lg:text-sm font-medium uppercase hover:text-pink-600">SUITS</Link>
              </div>
            </div>
          </div>

          {/* Search Bar and Icons - Enhanced Responsive */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
            {/* Search Bar - Always visible but responsive */}
            <div className="relative flex-1 max-w-[120px] xs:max-w-[150px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-none search-container">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => searchQuery && setShowSuggestions(true)}
                  className="w-full pl-6 pr-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-pink-500"
                />
                <button type="submit" className="absolute left-2 top-1/2 transform -translate-y-1/2">
                  <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
              
              {/* Search Suggestions Dropdown */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                  {searchSuggestions.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSuggestionClick(product)}
                      className="flex items-center p-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-8 h-8 object-cover rounded mr-3"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-900 truncate">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.color} • ${product.price}</p>
                      </div>
                    </div>
                  ))}
                  <div 
                    onClick={handleSearchSubmit}
                    className="p-2 text-xs text-pink-600 hover:bg-pink-50 cursor-pointer text-center font-medium border-t border-gray-200"
                  >
                    View all results for "{searchQuery}"
                  </div>
                </div>
              )}
            </div>

            {/* Icons - Responsive Spacing */}
            <div className="flex items-center space-x-0.5 sm:space-x-1 lg:space-x-2">
              <button className="text-gray-600 hover:text-pink-600 text-xs sm:text-sm p-1 hidden sm:block">
                <i className="far fa-calendar"></i>
              </button>
              
              {/* Cart Icon - Responsive */}
              <Link to="/cart" className="relative p-1">
                <span className="text-gray-600 hover:text-pink-600 text-xs sm:text-sm lg:text-base">🛒</span>
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-pink-600 text-white text-xs w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center font-medium">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Link>
              
              {/* Account - Responsive */}
              <div className="relative">
                {currentUser ? (
                  <button 
                    onClick={() => setIsAccountOpen(!isAccountOpen)}
                    className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-pink-600 text-xs sm:text-sm p-1"
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium">
                      {getUserInitials()}
                    </div>
                    <span className="hidden sm:inline ml-1">{currentUser.firstName}</span>
                  </button>
                ) : (
                  <Link 
                    to="/login" 
                    className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-pink-600 text-xs sm:text-sm p-1"
                  >
                    <i className="far fa-user"></i>
                    <span className="hidden sm:inline ml-1">Sign In</span>
                  </Link>
                )}
                
                {/* Account Dropdown - Responsive */}
                {isAccountOpen && currentUser && (
                  <div className="absolute right-0 mt-2 w-40 sm:w-44 lg:w-48 bg-white shadow-lg rounded-md border border-gray-200 py-1 z-50">
                    <div className="px-2 sm:px-3 lg:px-4 py-2 border-b border-gray-200">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                        {currentUser.firstName} {currentUser.lastName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                    </div>
                    <Link to="/account" className="block px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100">
                      My Account
                    </Link>
                    <Link to="/orders" className="block px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100">
                      My Orders
                    </Link>
                    <Link to="/favorites" className="block px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100">
                      My Favorites
                    </Link>
                    <hr className="my-1" />
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Enhanced */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="fixed left-0 top-0 h-full w-72 xs:w-80 bg-white shadow-xl z-50 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="border border-gray-800 px-3 py-1">
                  <Link to="/" className="text-gray-800 text-sm font-bold tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                    AZAZIE
                  </Link>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-600 hover:text-gray-800 p-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Mobile Menu Content */}
              <div className="p-4 space-y-4">
                {/* Main Categories */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Categories</h3>
                  <div className="space-y-1">
                    <Link 
                      to="/products?category=wedding" 
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-pink-600 rounded"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      BRIDAL
                    </Link>
                    <Link 
                      to="/products?category=formal" 
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-pink-600 rounded"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      ATELIER
                    </Link>
                    <Link 
                      to="/products?category=suits" 
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-pink-600 rounded"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      SUITS
                    </Link>
                  </div>
                </div>
                
                {/* Account Section - Mobile */}
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Account</h3>
                  <div className="space-y-1">
                    {currentUser ? (
                      <>
                        <Link 
                          to="/account" 
                          className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-pink-600 rounded"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          My Account
                        </Link>
                        <Link 
                          to="/orders" 
                          className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-pink-600 rounded"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          My Orders
                        </Link>
                        <Link 
                          to="/favorites" 
                          className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-pink-600 rounded"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          My Favorites
                        </Link>
                        <button 
                          onClick={() => {
                            handleLogout();
                            setIsMobileMenuOpen(false);
                          }}
                          className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link 
                          to="/login" 
                          className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-pink-600 rounded"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Sign In
                        </Link>
                        <Link 
                          to="/signup" 
                          className="block px-3 py-2 text-sm text-pink-600 font-medium hover:bg-pink-50 hover:text-pink-700 rounded"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sub Navigation - Category Links */}
        <div className="hidden xl:flex items-center justify-center space-x-2 sm:space-x-3 lg:space-x-4 xl:space-x-6 py-2 sm:py-3 border-t border-gray-200 overflow-x-auto">
          <Link to="/products" className="text-gray-700 hover:text-pink-600 text-xs sm:text-sm font-medium uppercase whitespace-nowrap">NEW</Link>
          <Link to="/products" className="text-gray-700 hover:text-pink-600 text-xs sm:text-sm font-medium uppercase whitespace-nowrap">HOME TRY ON</Link>
          <Link to="/products" className="text-gray-700 hover:text-pink-600 text-xs sm:text-sm font-medium uppercase whitespace-nowrap">BRIDESMAIDS</Link>
          <Link to="/products" className="text-gray-700 hover:text-pink-600 text-xs sm:text-sm font-medium uppercase whitespace-nowrap">BRIDES</Link>
          <Link to="/products" className="text-gray-700 hover:text-pink-600 text-xs sm:text-sm font-medium uppercase whitespace-nowrap">MOMS</Link>
          <Link to="/products" className="text-gray-700 hover:text-pink-600 text-xs sm:text-sm font-medium uppercase whitespace-nowrap">FLOWER GIRL</Link>
          <Link to="/products" className="text-gray-700 hover:text-pink-600 text-xs sm:text-sm font-medium uppercase whitespace-nowrap">FORMAL & EVENING</Link>
          <Link to="/products" className="text-gray-700 hover:text-pink-600 text-xs sm:text-sm font-medium uppercase whitespace-nowrap">PROM</Link>
          <Link to="/products" className="text-gray-700 hover:text-pink-600 text-xs sm:text-sm font-medium uppercase whitespace-nowrap">SUITS & TIES</Link>
          <Link to="/products" className="text-gray-700 hover:text-pink-600 text-xs sm:text-sm font-medium uppercase whitespace-nowrap">PAJAMAS & ROBES</Link>
          <Link to="/products" className="text-gray-700 hover:text-pink-600 text-xs sm:text-sm font-medium uppercase whitespace-nowrap">SHOES & ACC</Link>
          <Link to="/products" className="text-pink-600 hover:text-pink-700 text-xs sm:text-sm font-bold uppercase whitespace-nowrap">(FREE!) SWATCHES</Link>
          <Link to="/products" className="text-red-600 hover:text-red-700 text-xs sm:text-sm font-medium uppercase whitespace-nowrap">CLEARANCE</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
