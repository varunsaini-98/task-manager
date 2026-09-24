import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Button } from "../common/Button.jsx";

export const Navbar = ({ search, setSearch }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="navbar">
      <div className="search-box">
        <input
          type="text"
          className="input-field"
          placeholder="Search tasks or team..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex-gap">
        <div className="user-info">
          <div className="avatar-circle">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <div className="user-name">{user?.name}</div>
            <div className="user-role">
              {user?.role || (user?.isAdmin ? "Admin" : "Employee")}
            </div>
          </div>
        </div>
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </div>
    </header>
  );
};
