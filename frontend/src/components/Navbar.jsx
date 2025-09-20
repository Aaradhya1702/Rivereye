import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ locations = [], selected, onChange }) => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#0077b6",
        color: "white",
      }}
    >
      {/* Left: App Title */}
      <div style={{ fontWeight: "bold", fontSize: "20px" }}>
        Ganga Water Monitor
      </div>

      {/* Center: River Dropdown */}
      <div>
        {locations.length > 0 && (
          <select
            value={selected}
            onChange={(e) => onChange(e.target.value)}
            style={{
              padding: "5px 10px",
              fontSize: "16px",
              borderRadius: "5px",
            }}
          >
            {locations.map((loc, idx) => (
              <option key={idx} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Right: Navigation Links */}
      <div>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        <Link to="/login" style={linkStyle}>
          Login
        </Link>
        <Link to="/signup" style={linkStyle}>
          Sign Up
        </Link>
        <Link to="/dashboard" style={linkStyle}>
          Dashboard
        </Link>
      </div>
    </nav>
  );
};

const linkStyle = {
  color: "white",
  marginLeft: "15px",
  textDecoration: "none",
  fontWeight: "500",
};

export default Navbar;
