import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <div className="border border-gray-800 px-3 py-1 inline-block mb-4">
              <h3 className="text-xl font-bold tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>AZAZIE</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Your destination for beautiful bridesmaid dresses and special occasion attire.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <i className="fab fa-pinterest"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-bold mb-4 uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-400 hover:text-pink-400 text-sm transition-colors">Bridesmaid Dresses</Link></li>
              <li><Link to="/products?category=wedding" className="text-gray-400 hover:text-pink-400 text-sm transition-colors">Wedding Dresses</Link></li>
              <li><Link to="/products?category=mother" className="text-gray-400 hover:text-pink-400 text-sm transition-colors">Mother of Bride</Link></li>
              <li><Link to="/products?category=flower-girl" className="text-gray-400 hover:text-pink-400 text-sm transition-colors">Flower Girl</Link></li>
              <li><Link to="/products?category=formal" className="text-gray-400 hover:text-pink-400 text-sm transition-colors">Formal Dresses</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-bold mb-4 uppercase tracking-wider">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-pink-400 text-sm transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 text-sm transition-colors">Shipping Information</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 text-sm transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 text-sm transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 text-sm transition-colors">Fabric Swatches</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-sm font-bold mb-4 uppercase tracking-wider">About</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-pink-400 text-sm transition-colors">Our Story</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 text-sm transition-colors">Reviews</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 text-sm transition-colors">Press</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 text-sm transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 text-sm transition-colors">Affiliate Program</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 AZAZIE Clone. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
