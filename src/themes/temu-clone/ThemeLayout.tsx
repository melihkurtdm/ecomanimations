import React from "react";

const ThemeLayout = ({ page }: { page: string }) => {
  return (
    <div className="p-8 bg-orange-100 text-center text-2xl font-bold text-orange-700 rounded-lg shadow-md">
      Temu Clone Tema - Sayfa: {page}
    </div>
  );
};

export default ThemeLayout; 