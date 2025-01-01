import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile, fetchUserOrders } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const UserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate

  // Access Redux state
  const { profile: user, orders, loading, error } = useSelector((state) => state.user);
  console.log("user:",user);
  // Fetch user profile and orders on mount
  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchUserOrders());
  }, [dispatch]);

  // Handle loading and error states
  if (loading) {
    return <div className="p-8 text-center text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6 sm:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* User Details Section */}
        <div className="bg-white rounded-md shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
          <div className="mt-4 space-y-2">
            <p className="text-gray-700">
              <span className="font-semibold">Name:</span> {user?.name || "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> {user?.email || "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Phone:</span> {user?.phoneNumber || "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Address:</span> {user?.address || "N/A"}
            </p>
          </div>
        </div>

        {/* User Orders Section */}
        <div className="bg-white rounded-md shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900">Previous Orders</h2>
          {orders.length === 0 ? (
            <div className="mt-4 text-center">
              <p className="text-gray-600 text-lg">You have not yet made any orders.</p>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                onClick={() => navigate("/")} // Navigate to home route
              >
                Shop Now
              </button>
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border rounded-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order #{order.id}
                    </h3>
                    <p className="text-sm text-gray-700">
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-700">
                      Total: ${order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                      onClick={() => alert(`View details for Order #${order.id}`)}
                    >
                      View Details
                    </button>
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
