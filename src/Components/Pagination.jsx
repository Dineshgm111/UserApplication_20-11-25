import React from "react";
import "./styles/Pagination.css";

export default function Pagination({ page, setPage, totalPages, perPage, totalItems }) {
  if (totalPages <= 1) return null;

  const prev = () => setPage((p) => Math.max(1, p - 1));
  const next = () => setPage((p) => Math.min(totalPages, p + 1));

  // simple numeric pages (show max 5)
  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, start + 4);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="pagination">
      <div className="summary">Showing {(page-1)*perPage + 1} - {Math.min(page*perPage, totalItems)} of {totalItems}</div>
      <div className="controls">
        <button onClick={prev} disabled={page === 1}>Prev</button>
        {pages.map((p) => (
          <button key={p} className={p === page ? "active" : ""} onClick={() => setPage(p)}>{p}</button>
        ))}
        <button onClick={next} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
}
