import React, { useEffect, useState } from "react";
import { users as userData } from "./data/User.js";
import UserList from "./components/UserList.jsx";
import SearchBar from "./Components/Searchbar.jsx";
import Filters from "./Components/Filters.jsx";
import Sorter from "./Components/Sorter.jsx";
import Pagination from "./Components/Pagination.jsx";
import Modal from "./Components/Modal.jsx";
import "./App.css";

function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("none"); // 'name-asc', 'name-desc', 'age-asc', 'age-desc'
  const [page, setPage] = useState(1);
  const [perPage] = useState(8);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // load users (simulate loading)
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setAllUsers(userData);
      setLoading(false);
    }, 450); // slight delay to show loader
    return () => clearTimeout(t);
  }, []);

  // derived filtered + searched + sorted list
  const processed = React.useMemo(() => {
    let list = [...allUsers];

    // search
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.city.toLowerCase().includes(q)
      );
    }

    // filter by city
    if (cityFilter !== "All") {
      list = list.filter((u) => u.city === cityFilter);
    }

    // sort
    if (sortBy === "name-asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      list.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "age-asc") {
      list.sort((a, b) => a.age - b.age);
    } else if (sortBy === "age-desc") {
      list.sort((a, b) => b.age - a.age);
    }

    return list;
  }, [allUsers, query, cityFilter, sortBy]);

  // pagination
  const totalPages = Math.max(1, Math.ceil(processed.length / perPage));
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const paginated = processed.slice((page - 1) * perPage, page * perPage);

  // unique cities for filter dropdown
  const cities = React.useMemo(() => {
    const setC = new Set(allUsers.map((u) => u.city));
    return ["All", ...Array.from(setC).sort()];
  }, [allUsers]);

  // dark mode toggling class on body
  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <div className="app-container">
      <header className="app-header">
        <div>
          <h1>User Directory</h1>
          <p className="sub">Browse, search, filter and inspect users</p>
        </div>

        <div className="controls-top">
          <label className="dark-toggle">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode((s) => !s)}
            />
            <span>Dark</span>
          </label>
        </div>
      </header>

      <section className="toolbar">
        <SearchBar value={query} onChange={setQuery} />
        <Filters cities={cities} value={cityFilter} onChange={setCityFilter} />
        <Sorter value={sortBy} onChange={setSortBy} />
      </section>

      {loading ? (
        <div className="loader-wrap">
          <div className="dot-loader" />
        </div>
      ) : (
        <>
          <UserList users={paginated} onOpen={(u) => setSelectedUser(u)} />
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            perPage={perPage}
            totalItems={processed.length}
          />
        </>
      )}

      <Modal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
}

export default App;
