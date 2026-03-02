/**
 * Products Page Component
 * 
 * This page displays all products with filtering and sorting capabilities.
 * It allows users to browse dresses by category, color, and fabric,
 * with a responsive grid layout and professional UI matching Azazie.
 * 
 * Features:
 * - Dynamic product filtering by category, color, and fabric
 * - Sort functionality by price and popularity
 * - Responsive grid layout for all screen sizes
 * - Professional sidebar with filter options
 * - Product count display and clear filters option
 * - Empty state handling for no matching products
 * 
 * @component
 * @returns {JSX.Element} The products listing page
 */

import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

const Products = () => {
  // URL search parameters for filtering and sorting
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // State management for filters and sorting
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [selectedFabric, setSelectedFabric] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Main filtering logic - applies all active filters to products
   * Filters by category, color, fabric, and search query
   * Updates the filtered products state with matching results
   */
  useEffect(() => {
    let filtered = [...productsData];

    // Apply search filter from navbar
    const search = searchParams.get('search');
    if (search && search.trim()) {
      setSearchQuery(search.trim());
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.color.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase()) ||
        product.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply category filter
    const category = searchParams.get('category') || selectedCategory;
    if (category !== 'all') {
      filtered = filtered.filter(product => 
        product.category === category
      );
    }

    // Apply fabric filter - searches in product name for fabric keywords
    if (selectedFabric !== 'all') {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(selectedFabric.toLowerCase()) ||
        product.color.toLowerCase().includes(selectedFabric.toLowerCase())
      );
    }

    // Apply price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Apply sorting logic
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [searchParams, selectedCategory, sortBy, priceRange, selectedFabric, searchQuery]);

  /**
   * Clear all active filters and reset to default state
   * Resets all filter states including search
   */
  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedFabric('all');
    setPriceRange({ min: 0, max: 500 });
    setSearchQuery('');
    navigate('/products');
  };

  
  /**
   * Get available fabrics from products for filter options
   * Extracts unique fabric keywords from product names
   */
  const fabrics = [
    { value: 'all', label: 'All Fabrics' },
    { value: 'chiffon', label: 'Chiffon' },
    { value: 'satin', label: 'Satin' },
    { value: 'lace', label: 'Lace' },
    { value: 'tulle', label: 'Tulle' },
    { value: 'organza', label: 'Organza' }
  ];

  /**
   * Get available categories for filter options
   * Includes all main dress categories
   */
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'bridesmaid', label: 'Bridesmaid Dresses' },
    { value: 'wedding', label: 'Wedding Dresses' },
    { value: 'mother', label: 'Mother of Bride' },
    { value: 'flower-girl', label: 'Flower Girl' },
    { value: 'formal', label: 'Formal Dresses' },
    { value: 'suits', label: 'Suits' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-white via-pink-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-pink-600 to-pink-400 rounded-full"></div>
                  <h1 className="text-4xl sm:text-5xl font-light text-gray-900 tracking-wide">
                    {searchQuery ? `Search Results: "${searchQuery}"` : 
                     selectedCategory === 'all' ? 'All Dresses' : 
                     categories.find(c => c.value === selectedCategory)?.label}
                  </h1>
                </div>
                <div className="flex items-center space-x-4 ml-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-pink-600 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-500">{searchQuery ? 'Search results' : 'New arrivals'}</span>
                  </div>
                  <div className="h-4 w-px bg-gray-300"></div>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-pink-600 text-lg">{filteredProducts.length}</span>
                    <span className="text-gray-500 ml-1">dresses found</span>
                  </p>
                </div>
              </div>
              <div className="mt-6 sm:mt-0">
                <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-full border border-pink-200 shadow-sm">
                  <div className="w-2 h-2 bg-pink-600 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-pink-700">Free Shipping on Orders $129+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      {/* Main Content - Enhanced Responsive Layout */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full bg-white border border-gray-300 rounded-lg p-3 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.707 0l-6.414-6.414A1 1 0 013 6.586V4z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Filters</span>
              {(selectedCategory !== 'all' || selectedFabric !== 'all' || priceRange.max < 500) && (
                <span className="bg-pink-600 text-white text-xs px-2 py-1 rounded-full">
                  Active
                </span>
              )}
            </div>
            <svg className={`w-5 h-5 text-gray-600 transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Filters Sidebar - Mobile Optimized */}
          <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block lg:w-1/4 w-full lg:sticky lg:top-4`}>
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button 
                  onClick={clearFilters}
                  className="text-pink-600 hover:text-pink-700 text-sm font-medium"
                >
                  Clear All
                </button>
              </div>
              
              {/* Category Filter - Responsive */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2 sm:mb-3">Category</h3>
                <div className="space-y-1 sm:space-y-2">
                  {categories.map(category => (
                    <label key={category.value} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 sm:p-0 rounded">
                      <input
                        type="radio"
                        name="category"
                        value={category.value}
                        checked={selectedCategory === category.value}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-2 sm:mr-3 text-pink-600 focus:ring-pink-500"
                      />
                      <span className="text-xs sm:text-sm text-gray-700">{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter - Mobile Optimized */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2 sm:mb-3">Price Range</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs sm:text-sm text-gray-600 min-w-[3rem]">${priceRange.min}</span>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value)})}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-xs sm:text-sm text-gray-600 min-w-[3rem]">${priceRange.max}</span>
                  </div>
                </div>
              </div>

              
              {/* Fabric Filter - Responsive */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2 sm:mb-3">Fabric</h3>
                <div className="space-y-1 sm:space-y-2">
                  {fabrics.map(fabric => (
                    <label key={fabric.value} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 sm:p-0 rounded">
                      <input
                        type="radio"
                        name="fabric"
                        value={fabric.value}
                        checked={selectedFabric === fabric.value}
                        onChange={(e) => setSelectedFabric(e.target.value)}
                        className="mr-2 sm:mr-3 text-pink-600 focus:ring-pink-500"
                      />
                      <span className="text-xs sm:text-sm text-gray-700">{fabric.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters Button - Mobile Optimized */}
              <button
                onClick={clearFilters}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 sm:py-3 px-4 rounded-lg text-xs sm:text-sm font-medium transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Products Grid - Enhanced Responsive */}
          <div className="lg:w-3/4">
            {/* Header with Sort - Mobile Optimized */}
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h1 className="text-lg sm:text-xl font-light text-gray-900">
                    {searchQuery ? `Search: "${searchQuery}"` :
                     selectedCategory !== 'all' ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) : 'All'} Dresses
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'dress' : 'dresses'} found
                    {searchQuery && ` for "${searchQuery}"`}
                  </p>
                </div>
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <label className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">Sort:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full sm:w-auto px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid - Responsive */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 xs:gap-3 sm:gap-4 lg:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* Empty State - Mobile Optimized */
              <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-search text-gray-400 text-xl sm:text-2xl"></i>
                </div>
                <h3 className="text-lg sm:text-xl font-light text-gray-900 mb-2">
                  {searchQuery ? `No results for "${searchQuery}"` : 'No dresses found'}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  {searchQuery ? 
                   `Try searching with different keywords like "dress", "pink", or "wedding"` :
                   'Try adjusting your filters to see more results'
                  }
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
