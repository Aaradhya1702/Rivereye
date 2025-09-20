import React from "react";

function AlertsPanel({ alerts }) {
  if (!alerts || alerts.length === 0) {
    return (
      <div style={{ padding: "12px", background: "#f1f5f9", borderRadius: "8px" }}>
        <p style={{ margin: 0, color: "#475569" }}>✅ No alerts at the moment</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h3 style={{ marginBottom: "10px" }}>⚠️ Active Alerts</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {alerts.map((a) => (
          <li
            key={a._id}
            style={{
              marginBottom: "8px",
              padding: "10px",
              borderRadius: "6px",
              background: "#fee2e2",
              color: "#b91c1c",
              fontWeight: "500",
            }}
          >
            📍 {a.location} — DO: {a.parameters.DO}, BOD: {a.parameters.BOD},
            Nitrate: {a.parameters.Nitrate}, Fecal Coliform: {a.parameters.FecalColiform}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlertsPanel;
