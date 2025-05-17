import React from 'react';

const ElegantHeader = () => (
  <header className="bg-black border-b-2 border-yellow-500 p-4 flex justify-between items-center">
    <h1 className="text-2xl font-serif font-bold text-yellow-400">Elegant Boutique</h1>
    <nav>
      <a href="#" className="text-yellow-300 hover:text-white mx-2 font-serif">Home</a>
      <a href="#" className="text-yellow-300 hover:text-white mx-2 font-serif">Products</a>
      <a href="#" className="text-yellow-300 hover:text-white mx-2 font-serif">Contact</a>
    </nav>
  </header>
);

const ElegantFooter = () => (
  <footer className="bg-black border-t-2 border-yellow-500 p-4 text-center text-yellow-700 font-serif mt-8">
    © 2024 Elegant Boutique. All rights reserved.
  </footer>
);

const ElegantHomepage = () => (
  <section className="py-12 px-4 text-center bg-black">
    <h2 className="text-3xl font-serif font-semibold mb-4 text-yellow-400">Welcome to Elegance</h2>
    <p className="text-yellow-200 max-w-xl mx-auto font-serif">Experience luxury shopping with golden highlights and timeless style. Explore our exclusive collection below.</p>
  </section>
);

const ElegantProductList = () => (
  <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 bg-black">
    {[1,2,3,4,5,6].map((id) => (
      <div key={id} className="bg-gradient-to-br from-black to-yellow-900 rounded-lg shadow-lg p-6 flex flex-col items-center border border-yellow-700">
        <div className="w-32 h-32 bg-yellow-100 rounded mb-4" />
        <h3 className="text-lg font-serif font-medium text-yellow-200 mb-2">Product {id}</h3>
        <p className="text-yellow-400 mb-4 font-serif">Short product description goes here.</p>
        <button className="bg-yellow-500 text-black px-4 py-2 rounded font-serif hover:bg-yellow-600">View Details</button>
      </div>
    ))}
  </section>
);

const ElegantProductDetail = () => (
  <section className="max-w-2xl mx-auto bg-black rounded-lg shadow-lg p-8 mt-8 border border-yellow-700">
    <div className="w-full h-64 bg-yellow-100 rounded mb-6" />
    <h2 className="text-2xl font-serif font-bold text-yellow-400 mb-2">Product Name</h2>
    <p className="text-yellow-200 mb-4 font-serif">Detailed product description and features.</p>
    <button className="bg-yellow-500 text-black px-6 py-2 rounded font-serif hover:bg-yellow-600">Add to Cart</button>
  </section>
);

const ElegantThemeLayout = ({ page = 'homepage' }) => (
  <div className="min-h-screen bg-black flex flex-col font-serif">
    <ElegantHeader />
    <main className="flex-1">
      {page === 'homepage' && <ElegantHomepage />}
      {page === 'productList' && <ElegantProductList />}
      {page === 'productDetail' && <ElegantProductDetail />}
    </main>
    <ElegantFooter />
  </div>
);

export default ElegantThemeLayout; 