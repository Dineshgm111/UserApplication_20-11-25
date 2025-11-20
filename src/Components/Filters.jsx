import React from "react";
import "./styles/Filters.css";

export default function Filters({ cities = [], value, onChange }) {
  return (
    <div className="filters">
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {cities.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}
