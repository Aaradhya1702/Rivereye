import React from "react";

const thresholds = {
  DO: 5,
  BOD: 3,
  Nitrate: 10,
  FecalColiform: 500,
};

const Heatmap = ({ data }) => {
  if (!data || data.length === 0) return null;

  const parameters = Object.keys(data[0].parameters);

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Parameter Heatmap (Last 10 Days)</h3>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Date</th>
            {parameters.map((p) => (
              <th key={p}>{p}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.date}>
              <td>{new Date(d.date).toLocaleString()}</td>
              {parameters.map((p) => {
                const value = d.parameters[p];
                const safe = p === "DO" ? value >= thresholds[p] : value <= thresholds[p];
                return (
                  <td
                    key={p}
                    style={{
                      backgroundColor: safe ? "#d4edda" : "#f8d7da",
                      color: safe ? "#155724" : "#721c24",
                      textAlign: "center",
                      padding: "8px",
                    }}
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Heatmap;
