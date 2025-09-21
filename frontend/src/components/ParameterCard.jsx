import React, { useEffect, useState } from "react";
import { getSummary } from "../authService";

const safeThresholds = {
  DO: 5,
  BOD: 3,
  Nitrate: 10,
  FecalColiform: 500,
};

const ParameterCards = ({ location }) => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (!location) return;
    getSummary(location).then((res) => setSummary(res.data));
  }, [location]);

  if (!summary) return null;

  const { parameters } = summary;

  return (
    <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
      {Object.keys(parameters).map((key) => {
        const value = parameters[key];
        const safe = (key === "DO" ? value >= safeThresholds[key] : value <= safeThresholds[key]);
        return (
          <div
            key={key}
            style={{
              flex: 1,
              padding: "20px",
              borderRadius: "8px",
              backgroundColor: safe ? "#d4edda" : "#f8d7da",
              color: safe ? "#155724" : "#721c24",
              textAlign: "center",
            }}
          >
            <h4>{key} ({safe ? "Safe" : "Alert"})</h4>
            <p style={{ fontSize: "20px", margin: "10px 0" }}>{value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ParameterCards;
