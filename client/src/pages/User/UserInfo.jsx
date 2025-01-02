import React, { useState, useEffect } from 'react';

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const UserPage = () => {
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileAndOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch profile data
        const profileRes = await fetch('http://localhost:3000/api/users/profile', {
          credentials: 'include'
        });
        
        if (!profileRes.ok) {
          throw new Error('Failed to fetch profile');
        }
        
        const profileData = await profileRes.json();
        setProfile(profileData);

        // Fetch orders data
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
          <div className="text-center text-red-600">
            <h2 className="text-2xl font-bold mb-2">Error Loading Profile</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Profile Details</h1>
          {profile && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600">Name</label>
                <p className="mt-1 text-lg">{profile.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <p className="mt-1 text-lg">{profile.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Phone Number</label>
                <p className="mt-1 text-lg">{profile.phoneNumber || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Address</label>
                <p className="mt-1 text-lg">{profile.address || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Member Since</label>
                <p className="mt-1 text-lg">{formatDate(profile.createdAt)}</p>
              </div>
            </div>
          )}
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Order History</h2>
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-4 text-gray-500">No orders found</div>
              <button 
                onClick={() => window.location.href = '/shop'}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex flex-wrap justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Order #{order.id.slice(-6)}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>Date: {formatDate(order.createdAt)}</p>
                        <p>Items: {order.orderItems.length}</p>
                        <p>Payment Method: {order.payment?.paymentMethod || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">
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
                  
                  {/* Order Items */}
                  <div className="mt-4 border-t pt-4">
                    <div className="space-y-2">
                      {order.orderItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-gray-600">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <p className="font-medium">
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