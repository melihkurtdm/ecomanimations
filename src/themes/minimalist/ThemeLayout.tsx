import React from 'react';

const MinimalistHeader = () => (
  <header className="bg-white border-b p-4 flex justify-between items-center shadow-sm">
    <h1 className="text-2xl font-bold text-gray-800">Minimalist Shop</h1>
    <nav>
      <a href="#" className="text-gray-600 hover:text-black mx-2">Home</a>
      <a href="#" className="text-gray-600 hover:text-black mx-2">Products</a>
      <a href="#" className="text-gray-600 hover:text-black mx-2">Contact</a>
    </nav>
  </header>
);

const MinimalistFooter = () => (
  <footer className="bg-white border-t p-4 text-center text-gray-400 mt-8">
    © 2024 Minimalist Shop. All rights reserved.
  </footer>
);

const MinimalistHomepage = () => (
  <section className="py-12 px-4 text-center bg-white">
    <h2 className="text-3xl font-semibold mb-4 text-gray-800">Welcome to Minimalism</h2>
    <p className="text-gray-500 max-w-xl mx-auto">Discover a clean, modern shopping experience. Browse our curated collection below.</p>
  </section>
);

const MinimalistProductList = () => (
  <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 bg-white">
    {[1,2,3,4,5,6].map((id) => (
      <div key={id} className="bg-white rounded-xl shadow p-6 flex flex-col items-center border border-gray-100">
        <div className="w-32 h-32 bg-gray-100 rounded mb-4" />
        <h3 className="text-lg font-medium text-gray-800 mb-2">Product {id}</h3>
        <p className="text-gray-500 mb-4">Short product description goes here.</p>
        <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900">View Details</button>
      </div>
    ))}
  </section>
);

const MinimalistProductDetail = () => (
  <section className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 mt-8 border border-gray-100">
    <div className="w-full h-64 bg-gray-100 rounded mb-6" />
    <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Name</h2>
    <p className="text-gray-500 mb-4">Detailed product description and features.</p>
    <button className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900">Add to Cart</button>
  </section>
);

const MinimalistThemeLayout = ({ page = 'homepage' }) => (
  <div className="min-h-screen bg-white flex flex-col">
    <MinimalistHeader />
    <main className="flex-1">
      {page === 'homepage' && <MinimalistHomepage />}
      {page === 'productList' && <MinimalistProductList />}
      {page === 'productDetail' && <MinimalistProductDetail />}
    </main>
    <MinimalistFooter />
  </div>
);

export default MinimalistThemeLayout; 