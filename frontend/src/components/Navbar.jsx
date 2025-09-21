import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../authService";

const Navbar = ({ locations = [], selected, onChange }) => {
  const currentPath = useLocation().pathname;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, [currentPath]); // refresh on route change

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#e3f2fd",
        color: "#000",
        boxSizing: "border-box",
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: "20px" }}>
        <img src="/logo.png" alt="Logo" style={{ height: "60px" }} />
      </div>

      {/* Only show dropdown on Dashboard */}
      {currentPath === "/dashboard" && locations.length > 0 && (
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          style={{ padding: "5px 10px", fontSize: "16px", borderRadius: "5px" }}
        >
          {locations.map((loc, idx) => (
            <option key={idx} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      )}

      <div>
        <Link to="/" style={linkStyle}>
          Home
        </Link>

        {!user && (
          <Link to="/login" style={linkStyle}>
            Login
          </Link>
        )}
       {user!==null && <button
          onClick={handleLogout}
          style={{
            ...linkStyle,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          Logout
        </button>}
      </div>
      {user && (
        <>
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              ...linkStyle,
              backgroundColor: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "8px 18px",
              marginLeft: "15px",
              fontWeight: "600",
              boxShadow: "0 2px 8px rgba(25, 118, 210, 0.15)",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            Dashboard
          </button>
        </>
      )}
    </nav>
  );
};

const linkStyle = {
  color: "#000",
  marginLeft: "15px",
  textDecoration: "none",
  fontWeight: "500",
};

export default Navbar;
