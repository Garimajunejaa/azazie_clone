/**
 * Product Detail Page Component
 * 
 * This page displays detailed information about a single product.
 * It includes product images, descriptions, color/size selection,
 * quantity controls, and add to cart functionality.
 * 
 * Features:
 * - Product image gallery with thumbnail navigation
 * - Color and size selection with visual feedback
 * - Quantity controls with increment/decrement
 * - Add to cart functionality with success feedback
 * - Responsive design for all screen sizes
 * - Professional UI matching Azazie design
 * - Breadcrumb navigation
 * - Product details and features sections
 * 
 * @component
 * @returns {JSX.Element} The product detail page
 */

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';

const ProductDetail = () => {
  // Get product ID from URL parameters
  const { id } = useParams();
  // Cart context for add to cart functionality
  const { addToCart } = useCart();
  
  // Find the specific product by ID
  const product = productsData.find(p => p.id === parseInt(id));
  
  // State management for product customization
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [showAddedPopup, setShowAddedPopup] = useState(false);

  // Handle case where product is not found
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-light mb-4">Product Not Found</h1>
          <Link to="/products" className="text-pink-600 hover:text-pink-700 font-medium">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  /**
   * Handle adding product to cart
   * Adds the specified quantity of product with selected size to cart
   * Shows success popup feedback to user
   */
  const handleAddToCart = () => {
    // Add the product with the selected quantity and size
    addToCart(product, selectedSize, quantity);
    
    // Show added to cart popup
    setShowAddedPopup(true);
    setTimeout(() => {
      setShowAddedPopup(false);
    }, 2000);
  };

  /**
   * Handle quantity increase
   * Validates that quantity doesn't exceed available stock
   */
  const increaseQuantity = () => {
    if (quantity < 10) { // Max quantity limit
      setQuantity(quantity + 1);
    }
  };

  /**
   * Handle quantity decrease
   * Ensures quantity doesn't go below 1
   */
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Available color options for the product
  const colors = [
    { name: product.color, color: product.color, image: product.image },
    { name: 'Ivory', color: '#FFFFF0', image: product.image },
    { name: 'Champagne', color: '#F7E7CE', image: product.image },
    { name: 'Blush', color: '#F4C2C2', image: product.image }
  ];

  // Product image gallery (using same image for all views in this demo)
  const images = [
    product.image,
    product.image,
    product.image,
    product.image
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="py-4">
            <div className="flex items-center space-x-2 text-sm">
              <Link to="/" className="text-gray-500 hover:text-pink-600 transition-colors">Home</Link>
              <span className="text-gray-300">/</span>
              <Link to="/products" className="text-gray-500 hover:text-pink-600 transition-colors">Products</Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-medium">{product.name}</span>
            </div>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={images[selectedImage]} 
                alt={product.name}
                className="w-full h-[600px] object-cover rounded-lg shadow-sm"
              />
              <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-pink-600 border border-pink-200">
                New Arrival
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-pink-600 ring-2 ring-pink-200' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details - Enhanced Mobile Layout */}
          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            {/* Product Title and Price - Responsive */}
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-baseline space-x-2 sm:space-x-3">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-lg sm:text-xl text-gray-500 line-through">
                  ${(product.price * 1.3).toFixed(2)}
                </span>
                <span className="bg-red-500 text-white px-2 py-1 text-xs sm:text-sm font-medium rounded">
                  30% OFF
                </span>
              </div>
            </div>

            {/* Color Selection - Responsive */}
            <div>
              <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-2 sm:mb-3">Color: {colors[selectedColor].name}</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all ${
                      selectedColor === index 
                        ? 'border-pink-600 ring-2 ring-pink-200' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: color.color }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection - Responsive */}
            <div>
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <h3 className="text-sm sm:text-base font-medium text-gray-900">Size</h3>
                <button className="text-xs sm:text-sm text-pink-600 hover:text-pink-700 font-medium">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 sm:py-3 px-1 sm:px-2 border rounded-lg text-xs sm:text-sm font-medium transition-all ${
                      selectedSize === size
                        ? 'border-pink-600 bg-pink-50 text-pink-600'
                        : 'border-gray-300 hover:border-gray-400 text-gray-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Controls - Responsive */}
            <div>
              <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-2 sm:mb-3">Quantity</h3>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <button
                  onClick={decreaseQuantity}
                  className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <span className="text-lg sm:text-xl font-light">−</span>
                </button>
                <span className="w-12 sm:w-16 text-center font-medium text-sm sm:text-base">
                  {quantity}
                </span>
                <button
                  onClick={increaseQuantity}
                  className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <span className="text-lg sm:text-xl font-light">+</span>
                </button>
              </div>
            </div>

            {/* Action Buttons - Responsive */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-3 sm:py-4 rounded-lg font-medium transition-colors text-sm sm:text-base"
              >
                ADD TO BAG
              </button>
            </div>

            {/* Features - Responsive Grid */}
            <div className="border-t border-gray-200 pt-3 sm:pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <i className="fas fa-shipping-fast text-pink-600 text-sm sm:text-base"></i>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-900">Free Shipping</p>
                    <p className="text-xs text-gray-500">On orders $129+</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <i className="fas fa-undo text-pink-600 text-sm sm:text-base"></i>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-900">Easy Returns</p>
                    <p className="text-xs text-gray-500">30 days policy</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details - Responsive */}
            <div className="border-t border-gray-200 pt-3 sm:pt-4 mt-3 sm:mt-4">
              <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-2 sm:mb-3">PRODUCT DETAILS</h3>
              <ul className="text-gray-600 space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <li>• Premium quality fabric with exceptional drape</li>
                <li>• Available in multiple sizes and colors</li>
                <li>• Perfect for weddings, bridesmaids, and special occasions</li>
                <li>• Professional dry clean recommended</li>
                <li>• Imported with care and attention to detail</li>
                <li>• Fully lined for comfort and coverage</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Added to Cart Popup - Responsive */}
      {showAddedPopup && (
        <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 bg-white text-gray-900 px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-lg transform transition-all duration-300 z-50 flex items-center space-x-2 border border-gray-200">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span className="font-medium text-xs sm:text-sm">Added to Cart!</span>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
