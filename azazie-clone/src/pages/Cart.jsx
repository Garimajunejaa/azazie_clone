/**
 * Cart Page Component
 * 
 * This page displays user's shopping cart with all added items.
 * It allows users to modify quantities, remove items, and proceed to checkout.
 * Features order summary with pricing calculations and professional UI.
 * 
 * Features:
 * - Display all cart items with product details
 * - Quantity modification with increment/decrement controls
 * - Item removal functionality
 * - Order summary with subtotal, tax, and total calculations
 * - Free shipping promotion display
 * - Responsive design for all screen sizes
 * - Professional UI matching Azazie design
 * - Empty cart state with continue shopping option
 * - Clear cart functionality
 * 
 * @component
 * @returns {JSX.Element} The shopping cart page
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  // Cart context provides cart data and manipulation functions
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  /**
   * Handle empty cart state
   * Returns a user-friendly empty cart message with shopping link
   */
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        {/* Breadcrumb navigation for better UX */}
        <div className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="py-4">
              <div className="flex items-center space-x-2 text-sm">
                <Link to="/" className="text-gray-500 hover:text-pink-600 transition-colors">Home</Link>
                <span className="text-gray-300">/</span>
                <span className="text-gray-900 font-medium">Shopping Cart</span>
              </div>
            </nav>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="mb-8">
              🛒
            </div>
            <h1 className="text-3xl font-light text-gray-900 mb-4">Your Shopping Bag</h1>
            <p className="text-gray-600 mb-8 text-lg">Your shopping bag is currently empty</p>
            <Link 
              to="/products" 
              className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-block"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Calculate tax amount (8% tax rate)
   * Used for order summary calculations
   */
  const calculateTax = () => {
    return (parseFloat(getCartTotal()) * 0.08).toFixed(2);
  };

  /**
   * Calculate total amount including tax
   * Used for final order total
   */
  const calculateTotal = () => {
    return (parseFloat(getCartTotal()) * 1.08).toFixed(2);
  };

  /**
   * Get total number of items in cart
   * Sums up quantities of all cart items
   */
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb - Mobile Optimized */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <nav className="py-2 sm:py-4">
            <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm overflow-x-auto">
              <Link to="/" className="text-gray-500 hover:text-pink-600 transition-colors whitespace-nowrap">Home</Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-medium whitespace-nowrap">Shopping Bag</span>
            </div>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
          {/* Cart Items - Enhanced Mobile Layout */}
          <div className="lg:col-span-2">
            <div className="mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-2xl font-light text-gray-900">Shopping Bag</h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">{getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}</p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {cart.map((item, index) => (
                <div key={`${item.id}-${item.size}-${index}`} className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 lg:p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    {/* Product Image - Responsive */}
                    <div className="flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-24 h-32 sm:w-32 sm:h-40 object-cover rounded-lg"
                      />
                    </div>
                    
                    {/* Product Details - Mobile Optimized */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between mb-2 sm:mb-4">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm sm:text-base sm:text-lg font-medium text-gray-900 truncate">{item.name}</h3>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mt-1">
                            <span>Color: {item.color}</span>
                            <span>Size: {item.size}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="text-gray-400 hover:text-red-500 transition-colors ml-2 sm:ml-0"
                        >
                          <i className="fas fa-trash text-sm sm:text-base"></i>
                        </button>
                      </div>
                      
                      {/* Quantity and Price - Responsive */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <span className="text-lg sm:text-xl font-light">−</span>
                          </button>
                          <span className="w-8 sm:w-12 text-center font-medium text-sm sm:text-base">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <span className="text-lg sm:text-xl font-light">+</span>
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-base sm:text-lg sm:text-xl font-medium text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600">${item.price} each</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Continue Shopping - Mobile Optimized */}
            <div className="mt-4 sm:mt-6">
              <Link 
                to="/products" 
                className="text-pink-600 hover:text-pink-700 font-medium flex items-center transition-colors text-sm sm:text-base"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary - Enhanced Mobile Layout */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 lg:sticky lg:top-4">
              <h2 className="text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-6">Order Summary</h2>
              
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Subtotal ({getTotalItems()} items)</span>
                  <span className="font-medium">${getCartTotal()}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Estimated Tax</span>
                  <span className="font-medium">${calculateTax()}</span>
                </div>
                <div className="border-t border-gray-300 pt-3 sm:pt-4">
                  <div className="flex justify-between">
                    <span className="text-base sm:text-lg font-medium text-gray-900">Total</span>
                    <span className="text-lg sm:text-xl font-bold text-gray-900">${calculateTotal()}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 sm:py-4 rounded-lg font-medium transition-colors mb-3 sm:mb-4 text-sm sm:text-base">
                PROCEED TO CHECKOUT
              </button>
              
              <button
                onClick={clearCart}
                className="w-full border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
              >
                CLEAR SHOPPING BAG
              </button>

              <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-shipping-fast text-pink-600"></i>
                  <span>Free shipping on orders $99+</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-undo text-pink-600"></i>
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-lock text-pink-600"></i>
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
