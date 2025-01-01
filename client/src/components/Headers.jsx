import React, { useState } from 'react';
import { Menu, X, User, ShoppingBag, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useAuthNavigation } from './useAuthNavigation';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  const handleUserClick = () => {
    const { isAuthenticated } = useAuthNavigation();
    if (isAuthenticated) {
      navigate('/user');
    } else {
      navigate('/login');
    }
  };

  const handleCart = () => {
    const { isAuthenticated } = useAuthNavigation();
    if (isAuthenticated) {
      navigate('/cart');
    } else {
      navigate('/login');
    }
  };

    return (
        <header className="sticky top-0 z-50 bg-black text-white">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-full" />
                            <span className="font-bold text-lg">Cricket Store</span>
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        <a href="/products" className="text-sm font-medium hover:text-blue-500 transition-colors">
                            Products
                        </a>
                        <a href="/contact" className="text-sm font-medium hover:text-blue-500 transition-colors">
                            Contact
                        </a>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5 text-yellow-400" />
                            ) : (
                                <Moon className="w-5 h-5" />
                            )}
                        </button>
                        <button  onClick={handleUserClick}className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                            <User className="w-5 h-5" />
                        </button>
                        <button  onClick={handleCart }className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                            <ShoppingBag className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 hover:bg-gray-800 rounded-full transition-colors"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar - keeping the existing code */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-50">
                    {/* ... rest of your mobile menu code ... */}
                </div>
            )}
        </header>
    );
};

export default Header;