import React, { useEffect, useState } from "react";
import axios from "axios";
import GaugeChart from "react-gauge-chart";

const RHIGauge = ({ location }) => {
  const [rhi, setRhi] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/water/rhi/${location}`)
      .then((res) => setRhi(res.data))
      .catch((err) => console.error(err));
  }, [location]);

  if (!rhi) return <p>Loading RHI...</p>;

  const score = rhi.RHI / 100;

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
        marginTop: "20px",
      }}
    >
      <h3 style={{ marginBottom: "15px" }}>
        River Health Index – {rhi.location}
      </h3>
      <GaugeChart
        id="rhi-gauge"
        nrOfLevels={3}
        colors={["#dc2626", "#facc15", "#16a34a"]}
        arcWidth={0.3}
        percent={score}
        textColor="#1f2937"
      />
      <p style={{ marginTop: "15px", fontSize: "18px", fontWeight: "bold" }}>
        {rhi.RHI}/100 – {rhi.status}
      </p>
    </div>
  );
};

export default RHIGauge;
