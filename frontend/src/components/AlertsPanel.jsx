import React from "react";

function AlertsPanel({ alerts }) {
  if (!alerts || alerts.length === 0) return <p>No alerts</p>;

  return (
    <div>
      <h3>Alerts</h3>
      <ul>
        {alerts.map((a) => (
          <li key={a._id} style={{ color: "red" }}>
            {a.location} - DO: {a.parameters.DO}, BOD: {a.parameters.BOD},
            Nitrate: {a.parameters.Nitrate}, Fecal Coliform:{" "}
            {a.parameters.FecalColiform}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlertsPanel;
