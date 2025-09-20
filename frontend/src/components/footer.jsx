import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        color: "#101522",
        backgroundColor: "#fff",
        padding: "30px 0",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <img src={'/logo.png'} alt="Rivereye Logo" style={{ height: '100px', marginRight: '10px' }} />
        <p style={{ marginBottom: "20px", fontSize: "14px", color: "#101522", }}>
          A water quality monitoring platform for the Ganga River.  
          Track pollution levels, get alerts, and access clean data for awareness and research.
        </p>

        <div style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ color: "#101522", margin: "0 10px" }}>
            Home
          </Link>
          <Link to="/dashboard" style={{ color: "#101522", margin: "0 10px" }}>
            Dashboard
          </Link>
          <Link to="/faq" style={{ color: "#101522", margin: "0 10px" }}>
            FAQ
          </Link>
          <Link to="/signup" style={{ color: "#101522", margin: "0 10px" }}>
            Sign Up
          </Link>
        </div>

        <p style={{ fontSize: "12px", color: "#101522", }}>
          © {new Date().getFullYear()} Rivereye. Built for monitoring the
          lifeline of India – The Ganga.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
