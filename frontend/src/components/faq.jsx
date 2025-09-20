import React, { useState } from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "What does this platform do?",
      answer:
        "This platform monitors real-time water quality data of the Ganga River, helping citizens, researchers, and authorities track pollution levels.",
    },
    {
      question: "Which parameters are monitored?",
      answer:
        "We currently monitor Dissolved Oxygen (DO), Biological Oxygen Demand (BOD), Nitrate, and Fecal Coliform levels.",
    },
    {
      question: "WHY REAL-TIME DATA?",
      answer:
        "Real-time monitoring of parameters like DO, BOD, nitrate, and fecal coliform helps detect pollution early and supports better decision-making.",
    },
    {
      question: "WHY FORECASTING?",
      answer:
        "With a 3-day forecast, authorities and citizens can take preventive steps before water quality deteriorates further.",
    },
    {
      question: "How often is the data updated?",
      answer:
        "The system fetches the last 10 days of recorded data along with a 3-day forecast for each monitored location.",
    },
    {
      question: "What triggers an alert?",
      answer:
        "Alerts are generated if any parameter crosses predefined thresholds (e.g., DO < 5, BOD > 3, Nitrate > 10, Fecal Coliform > 500).",
    },
    {
      question: "Can I use this data for research or projects?",
      answer:
        "Yes! The data can be freely used for research, reports, and awareness campaigns. Please credit our platform when doing so.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section style={{ padding: "40px", backgroundColor: "#f9f9f9" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Frequently Asked Questions
      </h2>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: "10px",
              borderRadius: "8px",
              background: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              cursor: "pointer",
              overflow: "hidden",
              transition: "all 0.3s ease",
            }}
          >
            <div
              onClick={() => toggleFAQ(idx)}
              style={{
                padding: "15px",
                color: "#1c2237",
                fontWeight: "600",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {faq.question}
              <span>{openIndex === idx ? "−" : "+"}</span>
            </div>
            {openIndex === idx && (
              <div
                style={{
                  padding: "0 15px 15px 15px",
                  color: "#555",
                  background: "#fefefe",
                }}
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
