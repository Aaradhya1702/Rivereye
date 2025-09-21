import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {

  // Variants for text fade-up animation
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  // Floating circle style
  const floatingCircle = (size, top, left, color, delay) => ({
    position: "absolute",
    width: size,
    height: size,
    top: top,
    left: left,
    borderRadius: "50%",
    backgroundColor: color,
    opacity: 0.15,
    filter: "blur(20px)",
    zIndex: 0,
    animation: `float ${10 + delay}s ease-in-out infinite alternate`
  });

  return (
    <footer
      style={{
        position: "relative",
        overflow: "hidden",
        color: "#fff",
        background: "linear-gradient(-45deg, #0077b6, #48cae4, #90e0ef, #00b4d8)",
        backgroundSize: "400% 400%",
        padding: "50px 0",
        textAlign: "center",
        animation: "gradientBG 20s ease infinite"
      }}
    >
      {/* Floating circles */}
      <div style={floatingCircle("80px", "10%", "5%", "#fff", 0)}></div>
      <div style={floatingCircle("60px", "60%", "80%", "#fff", 3)}></div>
      <div style={floatingCircle("100px", "40%", "50%", "#fff", 5)}></div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }}
        variants={textVariants}
        style={{ position: "relative", zIndex: 1 }}
      >
        <motion.img 
          src={"/logo.png"} 
          alt="Rivereye Logo" 
          style={{ height: "100px", marginBottom: "20px" }}
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        />

        <p style={{ fontSize: "14px", marginBottom: "20px" }}>
          A water quality monitoring platform for the Ganga River.  
          Track pollution levels, get alerts, and access clean data for awareness and research.
        </p>

        <div style={{ marginBottom: "20px" }}>
          {["Home", "Dashboard", "FAQ", "Sign Up"].map((item, idx) => {
            const path = item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`;
            return (
              <motion.span 
                key={idx} 
                whileHover={{ scale: 1.2, color: "#ffdd59" }} 
                transition={{ duration: 0.3 }}
                style={{ margin: "0 15px", cursor: "pointer", fontWeight: "bold", fontSize: "15px" }}
              >
                <Link to={path} style={{ textDecoration: "none", color: "#fff" }}>{item}</Link>
              </motion.span>
            );
          })}
        </div>

        <p style={{ fontSize: "12px" }}>
          © {new Date().getFullYear()} Rivereye. Built for monitoring the lifeline of India – The Ganga.
        </p>
      </motion.div>

      {/* Gradient background animation */}
      <style>
        {`
          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes float {
            0% { transform: translateY(0px); }
            100% { transform: translateY(30px); }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
