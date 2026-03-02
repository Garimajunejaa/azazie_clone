# Azazie Clone - E-commerce Fashion Website

A modern, responsive e-commerce website clone of Azazie, specializing in bridesmaid dresses, wedding dresses, and formal wear. Built with React, Vite, and Tailwind CSS.

## 🛍️ Features

### 🏠 Homepage
- **Hero Section**: Responsive 4-category grid with hover effects
- **Trending Colors**: Interactive color swatches with filtering
- **Shop Collections**: Category-based product browsing
- **Featured Products**: Dynamic product showcase
- **Customer Testimonials**: Social proof section
- **About Section**: Brand information

### 🔍 Advanced Search System
- **Real-time Search**: Instant product suggestions as you type
- **Smart Filtering**: Search by name, color, category, and description
- **Search Suggestions**: Visual dropdown with product previews
- **URL Integration**: Shareable search results
- **Combined Filters**: Search + category/fabric/price filtering

### 📱 Fully Responsive Design
- **Mobile-First Approach**: Optimized for all screen sizes
- **Adaptive Navigation**: Collapsible mobile menu with slide-out drawer
- **Responsive Grids**: Dynamic product layouts (1-4 columns)
- **Touch-Friendly UI**: Large tap targets and smooth interactions
- **Cross-Device Compatibility**: Works on phones, tablets, and desktops

### 🛒 Shopping Features
- **Product Catalog**: Browse and filter dresses by multiple criteria
- **Smart Filters**: Category, price range, and fabric filtering
- **Product Cards**: Detailed product information with hover effects
- **Shopping Cart**: Add to cart functionality with item counter
- **Wishlist**: Save favorite products for later

### 👤 User Experience
- **Account System**: User registration and login
- **Order Tracking**: View order history and status
- **Personalized Recommendations**: Based on browsing history
- **Responsive Forms**: Mobile-optimized checkout process

## 🎨 Design & UI/UX

### Modern Design Elements
- **Clean Aesthetic**: Minimalist design inspired by Azazie
- **Color Scheme**: Pink and gray accents with clean typography
- **Micro-interactions**: Smooth hover effects and transitions
- **Loading States**: Professional loading animations
- **Error Handling**: Graceful fallbacks for missing data

### Responsive Breakpoints
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px+
- **Large Desktop**: 1440px+

## 🛠️ Technical Stack

### Frontend
- **React 18**: Modern React with hooks
- **Vite**: Fast development and build tool
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Font Awesome**: Icon library

### Development Tools
- **ESLint**: Code quality and consistency
- **Hot Module Replacement**: Instant development feedback
- **Responsive DevTools**: Mobile testing tools

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation with search
│   ├── ProductCard.jsx  # Product display component
│   └── Footer.jsx       # Site footer
├── pages/              # Main application pages
│   ├── Home.jsx        # Homepage
│   ├── Products.jsx    # Product listing with filters
│   ├── ProductDetail.jsx # Individual product page
│   └── Login.jsx       # User authentication
├── context/            # React context providers
│   └── CartContext.jsx # Shopping cart state
├── data/              # Static data
│   └── products.json  # Product catalog
└── styles/            # Global styles and CSS
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/azazie-clone.git
cd azazie-clone

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview
```

## 🎯 Key Implementations

### Search Functionality
- Real-time search with debouncing
- Multi-field product search (name, color, category, description)
- Visual search suggestions with product images
- URL-based search sharing
- Search result highlighting

### Responsive Design
- Mobile-first CSS approach
- Flexible grid systems
- Touch-optimized interactions
- Performance-optimized images
- Progressive enhancement

### State Management
- React Context for shopping cart
- Local storage for user preferences
- URL parameters for filtering and search
- Component-level state for UI interactions



