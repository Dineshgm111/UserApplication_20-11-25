import React from "react";
import "./styles/Sorter.css";

export default function Sorter({ value, onChange }) {
  return (
    <div className="sorter">
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="none">Sort: None</option>
        <option value="name-asc">Name ↑</option>
        <option value="name-desc">Name ↓</option>
        <option value="age-asc">Age ↑</option>
        <option value="age-desc">Age ↓</option>
      </select>
    </div>
  );
}
