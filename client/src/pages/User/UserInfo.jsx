import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const navigate = useNavigate();
  
  // Local state for user data and loading/error states
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile and orders
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user profile
        const profileResponse = await axios.get("http://localhost:3000/api/users/profile", {
          withCredentials: true,
        });
        setUser(profileResponse.data);

        // Fetch user orders
        const ordersResponse = await axios.get("http://localhost:3000/api/users/orders", {
          withCredentials: true,
        });
        setOrders(ordersResponse.data);
      } catch (err) {
        setError("Failed to fetch user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const renderError = (errorMessage) => (
    <div className="p-4 text-center text-red-500">{errorMessage}</div>
  );

  if (loading) return <div className="p-8 text-center text-gray-700">Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen p-6 sm:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* User Details */}
        <div className="bg-white rounded-md shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
          {error ? (
            renderError(error)
          ) : (
            <div className="mt-4 space-y-2">
              <p className="text-gray-700"><strong>Name:</strong> {user?.name || "N/A"}</p>
              <p className="text-gray-700"><strong>Email:</strong> {user?.email || "N/A"}</p>
              <p className="text-gray-700"><strong>Phone:</strong> {user?.phoneNumber || "N/A"}</p>
              <p className="text-gray-700"><strong>Address:</strong> {user?.address || "N/A"}</p>
            </div>
          )}
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-md shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900">Previous Orders</h2>
          {error ? (
            renderError(error)
          ) : orders.length === 0 ? (
            <div className="mt-4 text-center">
              <p className="text-gray-600 text-lg">You have not yet made any orders.</p>
              <button
                onClick={() => navigate("/")}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
              >
                Shop Now
              </button>
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const OrderCard = ({ order }) => (
  <div className="border rounded-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
    <div className="flex-1">
      <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
      <p className="text-sm text-gray-700">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
      <p className="text-sm text-gray-700">Total: ${order.totalAmount.toFixed(2)}</p>
    </div>
    <button
      className="mt-4 sm:mt-0 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
      onClick={() => alert(`View details for Order #${order.id}`)}
    >
      View Details
    </button>
  </div>
);

export default UserPage;
