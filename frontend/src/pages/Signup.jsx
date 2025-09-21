import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../authService';
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import waterAnimation from "../images/Water Animation.json"; // ⬅️ make sure the JSON is in this path


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({ email, password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div style={containerStyle}>
      {/* Background Lottie animation */}
      <Lottie animationData={waterAnimation} loop style={lottieStyle} />

      {/* Floating glowing orbs */}
      <motion.div
        style={bgCircle1}
        animate={{ x: [0, 30, -30, 0], y: [0, 20, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={bgCircle2}
        animate={{ x: [0, -40, 40, 0], y: [0, 25, -25, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main card */}
      <motion.div
        style={cardStyle}
        initial={{ opacity: 0, y: 60, rotateX: -10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
      >
        <motion.h2
          style={{ marginBottom: "20px", color: "#0077b6" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Create Account ✨
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          style={formStyle}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
            variants={formFieldVariant}
            whileFocus={{ scale: 1.05, borderColor: "#0077b6" }}
          />
          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
            variants={formFieldVariant}
            whileFocus={{ scale: 1.05, borderColor: "#0077b6" }}
          />
          <motion.button
            type="submit"
            style={buttonStyle}
            variants={formFieldVariant}
            whileHover={{
              scale: 1.08,
              backgroundColor: "#005f8c",
              boxShadow: "0 0 15px rgba(0,87,140,0.8)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
          {error && (
            <motion.p
              style={{ color: "red", marginTop: "10px" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}
        </motion.form>

        <motion.p
          style={{ marginTop: "15px", color: "#333" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Already have an account?{" "}
          <Link to="/login" style={linkStyle}>
            Login
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

// ================= Styles =================
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "linear-gradient(135deg, #03045e, #023e8a, #0077b6)",
  position: "relative",
  overflow: "hidden",
};

const lottieStyle = {
  position: "absolute",
  bottom: "-20px",
  width: "100%",
  height: "250px",
  zIndex: 0,
  opacity: 0.4,
};

const bgCircle1 = {
  position: "absolute",
  top: "-80px",
  left: "-100px",
  width: "300px",
  height: "300px",
  background: "rgba(144, 224, 239, 0.15)",
  borderRadius: "50%",
  filter: "blur(100px)",
  zIndex: 0,
};

const bgCircle2 = {
  position: "absolute",
  bottom: "-100px",
  right: "-120px",
  width: "350px",
  height: "350px",
  background: "rgba(0, 119, 182, 0.2)",
  borderRadius: "50%",
  filter: "blur(120px)",
  zIndex: 0,
};

const cardStyle = {
  background: "#ffffff",
  padding: "40px",
  borderRadius: "18px",
  boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
  width: "360px",
  textAlign: "center",
  zIndex: 1,
};

const formStyle = { display: "flex", flexDirection: "column", gap: "15px" };

const formFieldVariant = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  background: "#f9f9f9",
  color: "#000",
  fontSize: "16px",
  outline: "none",
  transition: "all 0.3s ease",
};

const buttonStyle = {
  padding: "12px",
  background: "#0077b6",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
  transition: "0.3s",
};

const linkStyle = {
  color: "#0077b6",
  textDecoration: "none",
  fontWeight: "bold",
};

export default Signup;
