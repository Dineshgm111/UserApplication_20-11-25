import React from "react";
import UserCard from "./UserCard";
import "./styles/UserList.css";

export default function UserList({ users = [], onOpen = () => {} }) {
  if (!users.length) {
    return (
      <div className="empty">
        No users found. Try adjusting search/filters.
      </div>
    );
  }

  return (
    <div className="user-grid">
      {users.map((u) => (
        <UserCard key={u.id} user={u} onOpen={() => onOpen(u)} />
      ))}
    </div>
  );
}
