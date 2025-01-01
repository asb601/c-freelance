import React from "react";
import { Sun, Moon, ShoppingBag, Award, Shield, Users } from "lucide-react";
import { useTheme } from "../../components/ThemeContext";

const Home = () => {
  const { theme } = useTheme();

  const stats = [
    { value: "1000+", label: "Cricket Bats", icon: Award },
    { value: "500+", label: "Premium Kits", icon: ShoppingBag },
    { value: "50+", label: "Brands", icon: Shield },
    { value: "10K+", label: "Happy Customers", icon: Users },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      {/* Hero Section */}
      <div className="relative min-h-[400px] md:h-[600px]">
        <div className={`absolute inset-0 ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-black to-transparent' 
            : 'bg-gradient-to-r from-white to-transparent'
        } z-10`} />
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center" />
        
        <div className="relative z-20 max-w-7xl mx-auto pt-20 px-4 md:px-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              EMBRACE THE SPIRIT OF CRICKET WITH US
            </h1>
            <p className={`text-base md:text-lg mb-8 ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Join our premium cricket community where you can purchase high-quality cricket gear. 
              From professional-grade bats to premium protective equipment, we've got everything you need.
            </p>
            <div className="flex gap-4">
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold transition-all flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                SHOP NOW
              </button>
              <button className={`border-2 px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
                theme === 'dark' 
                  ? 'border-white hover:bg-white hover:text-black' 
                  : 'border-black hover:bg-black hover:text-white'
              }`}>
                VIEW COLLECTION
              </button>
            </div>
          </div>

          {/* Featured Products Preview */}
          <div className={`mt-8 p-4 rounded-lg max-w-xs ${
            theme === 'dark' 
              ? 'bg-black/50 backdrop-blur-sm' 
              : 'bg-white/50 backdrop-blur-sm'
          }`}>
            <img 
              src="/api/placeholder/400/200" 
              alt="Featured Cricket Bats" 
              className="w-full h-32 object-cover rounded mb-3"
            />
            <h3 className="font-semibold">New Collection 2024</h3>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>Premium cricket bats starting from $299</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className={`py-12 ${
        theme === 'dark' ? 'bg-black' : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="w-8 h-8 text-green-500" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-green-500">
                  {stat.value}
                </div>
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="max-w-7xl mx-auto py-12 md:py-16 px-4 md:px-6">
        <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">
          SHOP BY CATEGORY
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {[
            { name: "Cricket Bats", price: "Starting from $199" },
            { name: "Protection Gear", price: "Starting from $99" },
            { name: "Cricket Kits", price: "Starting from $399" }
          ].map((category, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative h-48 md:h-64 overflow-hidden rounded-lg">
                <img 
                  src="/api/placeholder/400/300" 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className={`absolute inset-0 ${
                  theme === 'dark' ? 'bg-black/40' : 'bg-black/20'
                } group-hover:bg-black/50 transition-all duration-300`} />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                  <p className="text-gray-200 text-sm">{category.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brands Section */}
      <div className={`py-12 ${
        theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-center text-xl md:text-2xl font-bold mb-6 md:mb-8">
            FEATURED BRANDS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {['Brand 1', 'Brand 2', 'Brand 3', 'Brand 4'].map((brand, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                }`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;