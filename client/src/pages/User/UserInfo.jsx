import React, { useState, useEffect } from 'react';
import { useTheme } from "../../components/ThemeContext";
import { Clock, CreditCard, Package, User } from 'lucide-react';

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const UserPage = () => {
  const { theme } = useTheme();
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileAndOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const profileRes = await fetch('http://localhost:3000/api/users/profile', {
          credentials: 'include'
        });
        
        if (!profileRes.ok) {
          throw new Error('Failed to fetch profile');
        }
        
        const profileData = await profileRes.json();
        setProfile(profileData);

        const ordersRes = await fetch('http://localhost:3000/api/users/orders', {
          credentials: 'include'
        });
        
        if (ordersRes.status === 404) {
          setOrders([]);
        } else if (ordersRes.ok) {
          const ordersData = await ordersRes.json();
          setOrders(ordersData);
        } else {
          throw new Error('Failed to fetch orders');
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndOrders();
  }, []);

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${
        theme === 'dark' ? 'bg-black' : 'bg-gray-50'
      }`}>
        <div className="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen p-4 ${
        theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-black'
      }`}>
        <div className={`max-w-4xl mx-auto rounded-lg shadow p-6 ${
          theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
        }`}>
          <div className="text-center text-red-500">
            <h2 className="text-2xl font-bold mb-2">Error Loading Profile</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-black'
    }`}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Section */}
        <div className={`rounded-lg shadow p-6 transition-colors duration-300 ${
          theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-green-500" />
            <h1 className="text-2xl font-bold">Profile Details</h1>
          </div>
          
          {profile && (
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: 'Name', value: profile.name },
                { label: 'Email', value: profile.email },
                { label: 'Phone Number', value: profile.phoneNumber || 'Not provided' },
                { label: 'Address', value: profile.address || 'Not provided' },
                { label: 'Member Since', value: formatDate(profile.createdAt) }
              ].map((field, index) => (
                <div key={index} className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'
                }`}>
                  <label className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {field.label}
                  </label>
                  <p className="text-lg font-medium">{field.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Orders Section */}
        <div className={`rounded-lg shadow p-6 transition-colors duration-300 ${
          theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <Package className="w-6 h-6 text-green-500" />
            <h2 className="text-2xl font-bold">Order History</h2>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className={`mb-4 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                No orders found
              </div>
              <button 
                onClick={() => window.location.href = '/shop'}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className={`border rounded-lg p-4 ${
                  theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'
                }`}>
                  <div className="flex flex-wrap justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Order #{order.id.slice(-6)}
                      </h3>
                      <div className={`space-y-1 text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <p>Date: {formatDate(order.createdAt)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4" />
                          <p>Items: {order.orderItems.length}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          <p>Payment Method: {order.payment?.paymentMethod || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-500">
                        ${order.payment?.amount.toFixed(2)}
                      </p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                        order.payment?.status === 'COMPLETED' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.payment?.status || 'PENDING'}
                      </span>
                    </div>
                  </div>
                  
                  <div className={`mt-4 border-t pt-4 ${
                    theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'
                  }`}>
                    <div className="space-y-2">
                      {order.orderItems.map((item) => (
                        <div key={item.id} className={`flex justify-between items-center p-2 rounded-lg ${
                          theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'
                        }`}>
                          <div>
                            <p className="font-medium">{item.product.name}</p>
                            <p className={`text-sm ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <p className="font-medium text-green-500">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;