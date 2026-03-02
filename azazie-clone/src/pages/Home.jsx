import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

const Home = () => {
  const featuredProducts = productsData.slice(0, 12);
  
  const heroProducts = [
    {
      title: 'BRIDESMAID DRESSES',
      image: 'https://dummyimage.com/800x600/ff69b4/ffffff&text=BRIDESMAID',
      link: '/products',
      
    },
    {
      title: 'WEDDING DRESSES',
      image: 'https://dummyimage.com/800x600/ffffff/000000&text=WEDDING',
      link: '/products?category=wedding',
      
    },
    {
      title: 'MOTHER OF THE BRIDE',
      image: 'https://dummyimage.com/800x600/87ceeb/ffffff&text=MOTHER',
      link: '/products?category=mother',
     
    },
    {
      title: 'FORMAL DRESSES',
      image: 'https://dummyimage.com/800x600/da70d6/ffffff&text=FORMAL',
      link: '/products?category=formal',
      
    }
  ];

  const trendingColors = [
    { name: 'All', link: '/all/bridesmaid-dresses' },
    { name: 'Green', link: '/all/bridesmaid-dresses/colors-family/green', color: '#22c55e' },
    { name: 'Blue', link: '/all/bridesmaid-dresses/colors-family/blue', color: '#3b82f6' },
    { name: 'Pink', link: '/all/bridesmaid-dresses/colors-family/pink', color: '#ec4899' },
    { name: 'Purple', link: '/all/bridesmaid-dresses/colors-family/purple', color: '#8b5cf6' },
    { name: 'Red', link: '/all/bridesmaid-dresses/colors-family/red', color: '#ef4444' },
    { name: 'Orange', link: '/all/bridesmaid-dresses/colors-family/orange', color: '#f97316' },
    { name: 'Yellow', link: '/all/bridesmaid-dresses/colors-family/yellow', color: '#eab308' },
    { name: 'Neutral', link: '/all/bridesmaid-dresses/colors-family/neutral', color: '#a3a3a3' },
    { name: 'Grey', link: '/all/bridesmaid-dresses/colors-family/grey', color: '#6b7280' },
    { name: 'Brown', link: '/all/bridesmaid-dresses/colors-family/brown', color: '#92400e' },
    { name: 'Black', link: '/all/bridesmaid-dresses/colors-family/black', color: '#000000' },
    { name: 'White', link: '/all/bridesmaid-dresses/colors-family/white', color: '#ffffff' },
    { name: 'Jewel Tones', link: '/all/bridesmaid-dresses/colors-family/jewel-tones', color: '#7c3aed' },
    { name: 'Floral', link: '/all/bridesmaid-dresses/colors-family/floral', color: '#f59e0b' },
    { name: 'New In', link: '/all/bridesmaid-dresses/colors/powder-blue,silver-sage,lemongrass,basil,powder-pink,salmon-pink,antique-rose,canary', color: '#06b6d4' }
  ];

  const moreToExplore = [
    {
      title: 'ATELIER FORMAL',
      image: 'https://dummyimage.com/400x400/9370db/ffffff&text=FORMAL',
      link: '/products?category=formal'
    },
    {
      title: 'ROBES',
      image: 'https://dummyimage.com/400x400/ffd700/000000&text=ROBES',
      link: '/all/robes'
    },
    {
      title: 'WEDDING GUEST',
      image: 'https://dummyimage.com/400x400/ff1493/ffffff&text=GUEST',
      link: '/products?category=formal'
    },
    {
      title: 'JUNIOR BRIDESMAIDS',
      image: 'https://dummyimage.com/400x400/00bfff/ffffff&text=JUNIOR',
      link: '/all/junior-bridesmaid-dresses'
    },
    {
      title: 'FLOWER GIRLS',
      image: 'https://dummyimage.com/400x400/98fb98/000000&text=FLOWER',
      link: '/all/flower-girl-dresses'
    }
  ];

  const categories = [
    {
      title: 'BRIDESMAIDS',
      image: 'https://dummyimage.com/600x450/ff69b4/ffffff&text=BRIDESMAIDS',
      link: '/products'
    },
    {
      title: 'BRIDES',
      image: 'https://dummyimage.com/600x450/ffffff/000000&text=BRIDES',
      link: '/products?category=wedding'
    },
    {
      title: 'MOTHERS',
      image: 'https://dummyimage.com/600x450/87ceeb/ffffff&text=MOTHERS',
      link: '/products?category=mother'
    },
    {
      title: 'FLOWER GIRLS',
      image: 'https://dummyimage.com/600x450/98fb98/000000&text=FLOWER+GIRLS',
      link: '/products?category=flower-girl'
    },
    {
      title: 'FORMAL DRESSES',
      image: 'https://dummyimage.com/600x450/da70d6/ffffff&text=FORMAL',
      link: '/products?category=formal'
    },
    {
      title: 'COCKTAIL DRESSES',
      image: 'https://dummyimage.com/600x450/9370db/ffffff&text=COCKTAIL',
      link: '/products?category=cocktail'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      text: 'Absolutely love my dress! The quality is amazing and it fits perfectly.',
      rating: 5
    },
    {
      name: 'Jessica L.',
      text: 'Great customer service and beautiful dresses. Highly recommend!',
      rating: 5
    },
    {
      name: 'Emily R.',
      text: 'The customization options are fantastic. Exactly what I was looking for.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* 
        Hero Section with 4 Main Categories - Fully Responsive
        - Uses CSS Grid for responsive layout: 1 col (mobile), 2 col (tablet), 4 col (desktop)
        - Images have hover zoom effect for better interactivity
        - Gradient overlay ensures text readability over images
        - Error handling for failed image loads
        - Enhanced mobile heights and spacing
      */}
      <section className="w-full">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 w-full">
          {heroProducts.map((product, index) => (
            <div key={index} className="relative overflow-hidden group" style={{ paddingBottom: '120%' }}>
              <img
                src={product.image}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = 'https://dummyimage.com/800x600/cccccc/000000&text=IMAGE+NOT+FOUND';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                <div className="p-2 xs:p-3 sm:p-4 lg:p-6 w-full">
                  <Link
                    to={product.link}
                    className="text-white hover:text-pink-200 transition-colors block"
                  >
                    <h3 className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-wide text-center">{product.title}</h3>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 
        Promotional Banner for Free Swatches - Mobile Optimized
        - Eye-catching yellow background for visibility
        - Simple, centered text with responsive sizing
        - Reduced padding for mobile devices
      */}
      <section className="bg-yellow-100 py-1 xs:py-1.5 sm:py-2 px-2 xs:px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xs xs:text-sm sm:text-sm md:text-base font-bold text-gray-800 text-center">
            GET 10 FREE SWATCHES
          </h2>
        </div>
      </section>

      {/* 
        Trending Colors Section - Fully Responsive
        - Grid layout adjusts from 2 cols (small mobile) to 8 cols (desktop)
        - Color circles have hover effects for interactivity
        - Special handling for white color to ensure visibility
        - Links to color-filtered product pages
        - Enhanced mobile spacing and sizing
      */}
      <section className="py-4 xs:py-6 sm:py-8 md:py-10 lg:py-12 px-2 xs:px-3 sm:px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-center mb-3 xs:mb-4 sm:mb-6 lg:mb-8">Trending Bridesmaid Colors</h2>
          <div className="grid grid-cols-3 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-1.5 xs:gap-2 sm:gap-3 lg:gap-4 mb-3 xs:mb-4 sm:mb-6 lg:mb-8">
            {trendingColors.map((color, index) => (
              <Link
                key={index}
                to={color.link}
                className="group text-center"
              >
                <div
                  className="w-8 xs:w-10 sm:w-12 md:w-14 lg:w-16 h-8 xs:h-10 sm:h-12 md:h-14 lg:h-16 mx-auto rounded-full border-2 border-gray-200 mb-1 xs:mb-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: color.color }}
                >
                  {/* Special case for white color to ensure visibility */}
                  {color.name === 'White' && (
                    <div className="w-5 xs:w-6 sm:w-8 md:w-10 lg:w-12 h-5 xs:h-6 sm:h-8 md:h-10 lg:h-12 rounded-full bg-white border border-gray-300"></div>
                  )}
                  {/* Special case for grey color to ensure visibility */}
                  {color.name === 'Grey' && (
                    <div className="w-5 xs:w-6 sm:w-8 md:w-10 lg:w-12 h-5 xs:h-6 sm:h-8 md:h-10 lg:h-12 rounded-full bg-gray-500 border border-gray-400"></div>
                  )}
                </div>
                <span className="text-xs xs:text-sm text-gray-700 group-hover:text-pink-600 transition-colors">{color.name}</span>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/all/bridesmaid-dresses"
              className="bg-pink-600 hover:bg-pink-700 text-white px-2 xs:px-3 sm:px-4 lg:px-6 py-1.5 xs:py-2 sm:py-3 rounded-full text-xs xs:text-sm lg:text-base font-medium transition-colors"
            >
              SHOP ALL BRIDESMAID DRESSES
            </Link>
          </div>
        </div>
      </section>

      {/* Main Categories Grid - Fully Responsive */}
      <section className="py-6 xs:py-8 sm:py-10 md:py-12 px-2 xs:px-3 sm:px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-light text-center mb-4 xs:mb-6 sm:mb-8">Shop Our Collections</h2>
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 xs:gap-3 sm:gap-4 md:gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="group relative overflow-hidden rounded-lg block shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-w-4 aspect-h-3">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-32 xs:h-36 sm:h-40 md:h-48 lg:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://dummyimage.com/600x450/cccccc/000000&text=IMAGE+NOT+FOUND';
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-20 transition-all duration-300">
                  <h3 className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-light tracking-wide text-white px-2 text-center">{category.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* More to Explore Section - Fully Responsive */}
      <section className="py-6 xs:py-8 sm:py-10 md:py-12 px-2 xs:px-3 sm:px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-light text-center mb-4 xs:mb-6 sm:mb-8">More to Explore</h2>
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 xs:gap-3 sm:gap-4 md:gap-6">
            {moreToExplore.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="group text-center"
              >
                <div className="aspect-square overflow-hidden rounded-lg mb-1 xs:mb-2 sm:mb-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://dummyimage.com/400x400/cccccc/000000&text=IMAGE+NOT+FOUND';
                    }}
                  />
                </div>
                <h3 className="text-xs xs:text-sm font-medium text-gray-900 group-hover:text-pink-600 transition-colors px-1">{item.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - Fully Responsive */}
      <section className="py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 px-2 xs:px-3 sm:px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-light text-center mb-6 xs:mb-8 sm:mb-12 md:mb-16">Featured Dresses</h2>
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-6 xs:mt-8 sm:mt-12 md:mt-16">
            <Link
              to="/products"
              className="bg-gray-900 hover:bg-gray-800 text-white px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 text-sm xs:text-base sm:text-lg font-medium tracking-wide transition-colors"
            >
              VIEW ALL DRESSES
            </Link>
          </div>
        </div>
      </section>

      {/* About Azazie Section - Fully Responsive */}
      <section className="py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 px-2 xs:px-3 sm:px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-light mb-4 xs:mb-6 sm:mb-8">About Azazie</h2>
          <p className="text-sm xs:text-base sm:text-lg text-gray-700 mb-4 xs:mb-6 sm:mb-8 leading-relaxed px-2 xs:px-4">
            At AZAZIE, we believe that everyone deserves to have the dress of their dreams regardless of their size or budget. We're committed to body-positive fashion, representing all bodies in an industry that often does not. AZAZIE dresses are made-to-order, with fabric cut and hand-sewn upon order placement, allowing us to reduce waste and lower our environmental impact with no added cost to you.
          </p>
          <p className="text-sm xs:text-base sm:text-lg text-gray-700 mb-4 xs:mb-6 sm:mb-8 leading-relaxed px-2 xs:px-4">
            Now that you've found "the one", it's time to start planning and making major decisions, but you don't have to do it alone. Here at Azazie, we get inspired by love, and new brides every day. We are in the wedding business for a reason. Whether your style is modern or classic, elegant or bohemian, we have stunning wedding dresses for you at equally amazing prices.
          </p>
          <Link
            to="/about"
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 xs:px-6 sm:px-8 py-1.5 xs:py-2 sm:py-3 rounded-full text-xs xs:text-sm sm:text-base font-medium transition-colors"
          >
            LEARN MORE ABOUT US
          </Link>
        </div>
      </section>

      {/* Customer Testimonials - Fully Responsive */}
      <section className="py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 px-2 xs:px-3 sm:px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-light text-center mb-6 xs:mb-8 sm:mb-12 md:mb-16">What Our Customers Say</h2>
          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-3 xs:gap-4 sm:gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-3 xs:p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
                <div className="flex mb-2 xs:mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star text-yellow-400 text-xs xs:text-sm sm:text-base"></i>
                  ))}
                </div>
                <p className="text-xs xs:text-sm sm:text-base text-gray-700 mb-3 xs:mb-4 sm:mb-6 italic">"{testimonial.text}"</p>
                <p className="text-xs xs:text-sm sm:text-base font-medium text-gray-900">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Home;
