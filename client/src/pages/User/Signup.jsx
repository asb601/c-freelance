import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../components/ThemeContext";
import { User, Lock, Phone, Mail, Home, ShoppingBag } from 'lucide-react';
import axios from "axios";

export default function Signup() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, phoneNumber, address } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/users/register", {
        name,
        email,
        password,
        phoneNumber,
        address,
      });

      if (response.status === 201) {
        alert("Account created successfully!");
        navigate("/login");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-black text-white' 
        : 'bg-gray-50 text-black'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-green-500/5 pointer-events-none" />
      
      <div className="relative w-full max-w-2xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-full bg-green-500 mb-4">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <h2 className={`text-3xl font-bold tracking-tight mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Create Your Account
          </h2>
          <p className={`${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Join our cricket community today
          </p>
        </div>

        <div className={`rounded-xl shadow-lg p-8 ${
          theme === 'dark' 
            ? 'bg-zinc-900/50 backdrop-blur border border-white/10' 
            : 'bg-white'
        }`}>
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Full Name
              </label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={`block w-full rounded-lg pl-10 pr-3 py-2.5 text-sm ${
                    theme === 'dark'
                      ? 'bg-zinc-800 text-white border-zinc-700 focus:border-green-500'
                      : 'bg-white text-gray-900 border-gray-300 focus:border-green-500'
                  } border transition-colors duration-200`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`block w-full rounded-lg pl-10 pr-3 py-2.5 text-sm ${
                    theme === 'dark'
                      ? 'bg-zinc-800 text-white border-zinc-700 focus:border-green-500'
                      : 'bg-white text-gray-900 border-gray-300 focus:border-green-500'
                  } border transition-colors duration-200`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  className={`block w-full rounded-lg pl-10 pr-3 py-2.5 text-sm ${
                    theme === 'dark'
                      ? 'bg-zinc-800 text-white border-zinc-700 focus:border-green-500'
                      : 'bg-white text-gray-900 border-gray-300 focus:border-green-500'
                  } border transition-colors duration-200`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Confirm Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className={`block w-full rounded-lg pl-10 pr-3 py-2.5 text-sm ${
                    theme === 'dark'
                      ? 'bg-zinc-800 text-white border-zinc-700 focus:border-green-500'
                      : 'bg-white text-gray-900 border-gray-300 focus:border-green-500'
                  } border transition-colors duration-200`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Phone Number
              </label>
              <div className="relative">
                <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  name="phoneNumber"
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className={`block w-full rounded-lg pl-10 pr-3 py-2.5 text-sm ${
                    theme === 'dark'
                      ? 'bg-zinc-800 text-white border-zinc-700 focus:border-green-500'
                      : 'bg-white text-gray-900 border-gray-300 focus:border-green-500'
                  } border transition-colors duration-200`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Address
              </label>
              <div className="relative">
                <Home className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  name="address"
                  type="text"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className={`block w-full rounded-lg pl-10 pr-3 py-2.5 text-sm ${
                    theme === 'dark'
                      ? 'bg-zinc-800 text-white border-zinc-700 focus:border-green-500'
                      : 'bg-white text-gray-900 border-gray-300 focus:border-green-500'
                  } border transition-colors duration-200`}
                />
              </div>
            </div>

            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="flex w-full justify-center items-center gap-2 rounded-lg bg-green-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-600 transition-colors duration-200"
              >
                <User className="w-4 h-4" />
                Create Account
              </button>
            </div>
          </form>

          <div className={`mt-6 pt-6 text-center text-sm ${
            theme === 'dark' ? 'border-t border-zinc-800' : 'border-t border-gray-200'
          }`}>
            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
              Already have an account?{" "}
            </span>
            <button
              onClick={() => navigate("/login")}
              className="font-semibold text-green-500 hover:text-green-600 transition-colors duration-200"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}