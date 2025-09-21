import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is Rivereye?",
      answer:
        "Rivereye is a platform that provides real-time monitoring of the Ganga River’s water quality, helping citizens, researchers, and authorities track pollution levels easily.",
    },
    {
      question: "Which water parameters are tracked?",
      answer:
        "We monitor Dissolved Oxygen (DO), Biological Oxygen Demand (BOD), Nitrate, and Fecal Coliform to ensure accurate water quality assessment.",
    },
    {
      question: "Why real-time data?",
      answer:
        "Real-time data allows for early detection of pollution, helping authorities and communities make informed decisions quickly.",
    },
    {
      question: "Why forecasting?",
      answer:
        "Our 3-day forecast predicts potential water quality issues, enabling preventive actions before conditions worsen.",
    },
    {
      question: "How often is the data updated?",
      answer:
        "Data is updated continuously, including the last 10 days of recorded measurements and a 3-day forecast for each location.",
    },
    {
      question: "What triggers an alert?",
      answer:
        "Alerts are generated whenever any parameter exceeds safe limits, e.g., DO < 5 mg/L, BOD > 3 mg/L, Nitrate > 10 mg/L, Fecal Coliform > 500 CFU/100mL.",
    },
    {
      question: "Can I use this data for research or projects?",
      answer:
        "Yes! The data is freely available for research, reports, and awareness campaigns. Please credit Rivereye when using the data.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section style={{ padding: "60px 20px", backgroundColor: "#f9f9f9" }}>
      <h2 style={{ textAlign: "center", marginBottom: "40px", fontSize: "28px", color: "#0077b6" }}>
        Frequently Asked Questions
      </h2>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {faqs.map((faq, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: idx * 0.1, type: "spring", stiffness: 100 }}
            style={{
              marginBottom: "15px",
              borderRadius: "12px",
              background: "#fff",
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              cursor: "pointer",
              overflow: "hidden",
            }}
          >
            <div
              onClick={() => toggleFAQ(idx)}
              style={{
                padding: "18px 20px",
                color: "#1c2237",
                fontWeight: "600",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "16px",
              }}
            >
              {faq.question}
              <motion.span
                animate={{ rotate: openIndex === idx ? 45 : 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ display: "inline-block", fontSize: "20px", color: "#0077b6" }}
              >
                +
              </motion.span>
            </div>

            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{
                    padding: "0 20px 20px 20px",
                    color: "#555",
                    fontSize: "15px",
                    lineHeight: "1.6",
                    background: "#fefefe",
                  }}
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
