import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../authService';
import { motion } from 'framer-motion';


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
      {/* Background design elements */}
      <div style={bgCircle1}></div>
      <div style={bgCircle2}></div>

      <motion.div
        style={cardStyle}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          style={{ marginBottom: '20px', color: '#0077b6' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Welcome Back 👋
        </motion.h2>

        <form onSubmit={handleSubmit} style={formStyle}>
          <motion.input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={inputStyle}
            whileFocus={{ scale: 1.02, borderColor: '#0077b6' }}
          />
          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={inputStyle}
            whileFocus={{ scale: 1.02, borderColor: '#0077b6' }}
          />
          <motion.button
            type="submit"
            style={buttonStyle}
            whileHover={{ scale: 1.05, backgroundColor: '#005f8c' }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </form>

        <p style={{ marginTop: '15px', color: '#333' }}>
          Don’t have an account?{' '}
          <Link to="/signup" style={linkStyle}>
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: 'linear-gradient(135deg, #03045e, #023e8a, #0077b6)',
  position: 'relative',
  overflow: 'hidden',
};

const bgCircle1 = {
  position: 'absolute',
  top: '-100px',
  left: '-100px',
  width: '300px',
  height: '300px',
  background: 'rgba(144, 224, 239, 0.15)',
  borderRadius: '50%',
  filter: 'blur(80px)',
};

const bgCircle2 = {
  position: 'absolute',
  bottom: '-120px',
  right: '-100px',
  width: '350px',
  height: '350px',
  background: 'rgba(0, 119, 182, 0.2)',
  borderRadius: '50%',
  filter: 'blur(100px)',
};

const cardStyle = {
  background: '#ffffff',
  padding: '40px',
  borderRadius: '16px',
  boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
  width: '360px',
  textAlign: 'center',
  zIndex: 1,
};

const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };

const inputStyle = {
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  background: '#f9f9f9',
  color: '#000',
  fontSize: '16px',
  outline: 'none',
  transition: 'all 0.3s ease',
};

const buttonStyle = {
  padding: '12px',
  background: '#0077b6',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  transition: '0.3s',
};

const linkStyle = {
  color: '#0077b6',
  textDecoration: 'none',
  fontWeight: 'bold',
};

export default Login;
