import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ locations = [], selected, onChange }) => {
  const currentPath = useLocation().pathname;

  return (
    <nav style={{
      position: 'fixed', // Make navbar fixed
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#e3f2fd',
      color: '#000',
      boxSizing: 'border-box'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '20px' }}>
        <img src="/logo.png" alt="Logo" style={{ height: '60px' }} />
      </div>

      {/* Only show dropdown on Dashboard */}
      {currentPath === '/dashboard' && locations.length > 0 && (
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          style={{ padding: '5px 10px', fontSize: '16px', borderRadius: '5px' }}
        >
          {locations.map((loc, idx) => (
            <option key={idx} value={loc}>{loc}</option>
          ))}
        </select>
      )}

      <div>
        <Link  to="/" style={linkStyle}>Home</Link>
        <Link  to="/login" style={linkStyle}>Login</Link>
        <Link  to="/dashboard" style={linkStyle}>Dashboard</Link>
      </div>
    </nav>
  );
};

const linkStyle = {
  color: '#000',
  marginLeft: '15px',
  textDecoration: 'none',
  fontWeight: '500'
};

export default Navbar;
