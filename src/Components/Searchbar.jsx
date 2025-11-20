import React from "react";
import "./styles/SearchBar.css";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        type="search"
        placeholder="Search by name, email, city..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
