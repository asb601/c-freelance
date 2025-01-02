import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../components/ThemeContext";
import { User, Lock, ShoppingBag } from 'lucide-react';
import axios from "axios";

export default function Login() {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert(response.data.message || "Login successful!");
        navigate("/");
      } else {
        alert(response.data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert(error.response?.data?.message || "An error occurred. Please try again later.");
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
      
      <div className="relative sm:mx-auto sm:w-full sm:max-w-md px-6 py-12">
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-full bg-green-500 mb-4">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <h2 className={`text-3xl font-bold tracking-tight mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Welcome Back
          </h2>
          <p className={`${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Login to access your cricket gear
          </p>
        </div>

        <div className={`rounded-xl shadow-lg p-8 ${
          theme === 'dark' 
            ? 'bg-zinc-900/50 backdrop-blur border border-white/10' 
            : 'bg-white'
        }`}>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Email address
              </label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`block w-full rounded-lg pl-10 pr-3 py-2.5 text-sm ${
                    theme === 'dark'
                      ? 'bg-zinc-800 text-white border-zinc-700 focus:border-green-500'
                      : 'bg-white text-gray-900 border-gray-300 focus:border-green-500'
                  } border transition-colors duration-200`}
                  placeholder="Enter your email"
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
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full rounded-lg pl-10 pr-3 py-2.5 text-sm ${
                    theme === 'dark'
                      ? 'bg-zinc-800 text-white border-zinc-700 focus:border-green-500'
                      : 'bg-white text-gray-900 border-gray-300 focus:border-green-500'
                  } border transition-colors duration-200`}
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center items-center gap-2 rounded-lg bg-green-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-600 transition-colors duration-200"
              >
                <Lock className="w-4 h-4" />
                Login
              </button>
            </div>
          </form>

          <div className={`mt-6 pt-6 text-center text-sm ${
            theme === 'dark' ? 'border-t border-zinc-800' : 'border-t border-gray-200'
          }`}>
            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
              Don't have an account?{" "}
            </span>
            <button
              onClick={() => navigate("/signup")}
              className="font-semibold text-green-500 hover:text-green-600 transition-colors duration-200"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}