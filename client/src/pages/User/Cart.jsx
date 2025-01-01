import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useTheme } from "../../components/ThemeContext";
import axios from 'axios';

export default function Cart() {
  const { theme } = useTheme();
  const [cartItems, setCartItems] = useState([]);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products/getCart', {
          withCredentials: true,
        });
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const response = await axios.patch(`http://localhost:3000/api/products/cart/${itemId}`, 
        { quantity: newQuantity }, 
        { withCredentials: true }
      );
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/products/cart/${itemId}`, {
        withCredentials: true,
      });
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleApplyDiscount = () => {
    if (discountCode.trim() === 'SAVE10') {
      setAppliedDiscount(0.1); // 10% discount
    } else {
      alert('Invalid discount code');
      setAppliedDiscount(0);
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const discount = appliedDiscount * subtotal;
  const deliveryFee = 50;
  const total = subtotal - discount + deliveryFee;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className={`min-h-screen ${
      theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className={`text-2xl font-semibold mb-8 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className={`text-center py-12 ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          } rounded-lg shadow-sm`}>
            <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className={`${
                    theme === 'dark' ? 'bg-gray-900' : 'bg-white'
                  } rounded-lg shadow-sm p-6`}
                >
                  <div className="flex items-center">
                    <img
                      src={item.product.images?.[0] || '/api/placeholder/100/100'}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-md object-cover"
                    />
                    <div className="ml-6 flex-1">
                      <div className="flex justify-between">
                        <h3 className={`font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {item.product.name}
                        </h3>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className={`p-2 rounded-full transition-colors ${
                            theme === 'dark' 
                              ? 'hover:bg-gray-800 text-red-400 hover:text-red-300' 
                              : 'hover:bg-gray-100 text-red-500 hover:text-red-600'
                          }`}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      {item.product.dimensions && (
                        <p className={`mt-1 text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {item.product.dimensions}
                        </p>
                      )}
                      <div className="mt-2 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className={`p-1 rounded-full transition-colors ${
                              theme === 'dark' 
                                ? 'hover:bg-gray-800 text-gray-300' 
                                : 'hover:bg-gray-100 text-gray-600'
                            }`}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className={`p-1 rounded-full transition-colors ${
                              theme === 'dark' 
                                ? 'hover:bg-gray-800 text-gray-300' 
                                : 'hover:bg-gray-100 text-gray-600'
                            }`}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className={`font-medium ${
                          theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                        }`}>
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className={`${
                theme === 'dark' ? 'bg-gray-900' : 'bg-white'
              } rounded-lg shadow-sm p-6`}>
                <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      Subtotal
                    </span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      Discount
                    </span>
                    <span className="font-medium text-green-500">
                      -${discount.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      Delivery Fee
                    </span>
                    <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                  </div>
                  
                  <div className={`h-px ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                  }`} />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Discount Code Input */}
                <div className="mt-6">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="Discount code"
                      className={`flex-1 px-3 py-2 rounded-md border transition-colors ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
                      }`}
                    />
                    <button
                      onClick={handleApplyDiscount}
                      className={`px-4 py-2 rounded-md transition-colors ${
                        theme === 'dark'
                          ? 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                    >
                      Apply
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition-colors font-medium"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
