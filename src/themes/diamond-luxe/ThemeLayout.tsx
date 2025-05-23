// src/themes/diamond-luxe/ThemeLayout.tsx
import React from "react";

const ThemeLayout = ({ page = 'homepage' }) => {
  return (
    <div style={{ padding: "2rem", fontFamily: "serif", backgroundColor: "#faf5f0" }}>
      <h1 style={{ fontSize: "2rem", color: "#bfa16a" }}>Diamond Luxe Theme</h1>
      <p>Page: {page}</p>
    </div>
  );
};

export default ThemeLayout; 