import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [showSizeSelector, setShowSizeSelector] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    setShowSizeSelector(false);
  };

  return (
    <div className="bg-white group">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400';
            }}
          />
        </Link>
        
        {/* Quick Add Button */}
        <button
          onClick={() => setShowSizeSelector(!showSizeSelector)}
          className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 right-2 sm:left-3 sm:right-3 md:left-4 md:right-4 bg-white text-gray-900 py-2 px-3 sm:py-2 sm:px-4 text-xs sm:text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-gray-300"
        >
          QUICK ADD
        </button>
        
        {/* Category Badge */}
        <div className="absolute top-2 right-2 bg-pink-600 text-white text-xs px-2 py-1 rounded">
          {product.category}
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-3 sm:p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1 sm:mb-2 hover:text-pink-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{product.color}</p>
        <div className="flex items-center justify-between">
          <span className="text-base sm:text-lg font-bold text-gray-900">${product.price}</span>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button 
              className="text-gray-400 hover:text-red-500 transition-colors"
              onClick={() => {
                // Add to favorites functionality
                console.log('Add to favorites:', product);
              }}
            >
              <i className="far fa-heart text-sm sm:text-base"></i>
            </button>
            <button 
              className="bg-pink-600 hover:bg-pink-700 text-white px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm font-medium transition-colors"
              onClick={handleAddToCart}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      
      {/* Size Selector */}
      {showSizeSelector && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-300 rounded-lg shadow-lg p-3 sm:p-4 z-10">
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm border rounded transition-colors ${
                  selectedSize === size
                    ? 'border-pink-600 bg-pink-600 text-white'
                    : 'border-gray-300 hover:border-pink-600'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded text-sm sm:text-base font-medium transition-colors"
          >
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
