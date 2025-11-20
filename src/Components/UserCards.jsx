import React from "react";
import "./styles/UserCard.css";

export default function UserCard({ user, onOpen = () => {} }) {
  return (
    <div className="user-card" onClick={onOpen} role="button" tabIndex={0}>
      <div className="avatar">{user.name.slice(0, 1).toUpperCase()}</div>
      <div className="user-info">
        <h3>{user.name}</h3>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>City:</strong> {user.city}</p>
      </div>
    </div>
  );
}
