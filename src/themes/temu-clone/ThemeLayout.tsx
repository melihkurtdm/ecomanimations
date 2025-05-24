import React from "react";

const ThemeLayout = ({ page }: { page: string }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-orange-600">Temu Clone</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Banner */}
        <div className="bg-orange-100 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-orange-800 mb-2">Welcome to Temu Clone</h2>
          <p className="text-orange-700">Discover amazing deals and products!</p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-square bg-gray-200"></div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Product {item}</h3>
                <p className="text-orange-600 font-bold">$19.99</p>
                <button className="mt-2 w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-8">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600">© 2024 Temu Clone. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ThemeLayout; 