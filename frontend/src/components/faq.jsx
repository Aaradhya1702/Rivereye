import React from "react";

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
              marginBottom: "20px",
              padding: "15px",
              borderRadius: "8px",
              background: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h4 style={{ marginBottom: "8px", color: "#1c2237" }}>
              {faq.question}
            </h4>
            <p style={{ margin: 0, color: "#555" }}>{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
