import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: '20px', color: '#0077b6' }}>Login</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
            style={inputStyle}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Login</button>
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </form>
        <p style={{ marginTop: '15px' }}>
          Don't have an account? <Link to="/signup" style={linkStyle}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: 'linear-gradient(to right, #caf0f8, #ade8f4)'
};

const cardStyle = {
  background: 'white',
  padding: '40px',
  borderRadius: '12px',
  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
  width: '350px',
  textAlign: 'center'
};

const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const inputStyle = { padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '16px' };
const buttonStyle = { padding: '12px', background: '#0077b6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' };
const linkStyle = { color: '#0077b6', textDecoration: 'none', fontWeight: 'bold' };

export default Login;
