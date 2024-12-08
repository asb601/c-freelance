import React from "react";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-6 sm:p-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to Cricket Store!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Discover a wide range of high-quality cricket products for players of all skill levels. From bats and kits to jerseys and accessories, we have everything you need to perform at your best.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cricket Bats */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900">Cricket Bats</h2>
            <p className="text-gray-700 mt-2">
              Explore our premium collection of cricket bats for all playing styles.
            </p>
            <a
              href="/cricket-bats"
              className="inline-block mt-4 text-indigo-600 hover:text-indigo-500 font-semibold"
            >
              Shop Now →
            </a>
          </div>

          {/* Kits */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900">Kits</h2>
            <p className="text-gray-700 mt-2">
              Get complete cricket kits designed for professionals and beginners alike.
            </p>
            <a
              href="/kits"
              className="inline-block mt-4 text-indigo-600 hover:text-indigo-500 font-semibold"
            >
              Shop Now →
            </a>
          </div>

          {/* Jerseys */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900">Jerseys</h2>
            <p className="text-gray-700 mt-2">
              Stylish and durable jerseys for teams and individual players.
            </p>
            <a
              href="/jerseys"
              className="inline-block mt-4 text-indigo-600 hover:text-indigo-500 font-semibold"
            >
              Shop Now →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
