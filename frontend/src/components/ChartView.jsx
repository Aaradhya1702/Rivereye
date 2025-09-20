import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ChartView({ data, parameter, onParameterChange }) {
  if (!data || data.length === 0) return null;

  const labels = data.map((d) => new Date(d.date).toLocaleDateString());
  const values = data.map((d) => d.parameters[parameter]);
  const forecast = data.map((d) => d.forecast[parameter]);

  const chartData = {
    labels,
    datasets: [
      {
        label: `${parameter} (Actual)`,
        data: values,
        borderColor: "#2563eb", // Tailwind blue-600
        backgroundColor: "rgba(37, 99, 235, 0.1)",
        tension: 0.3,
        pointRadius: 4,
      },
      {
        label: `${parameter} (Forecast)`,
        data: forecast,
        borderColor: "#dc2626", // Tailwind red-600
        borderDash: [6, 6],
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 12 },
        },
      },
      title: {
        display: true,
        text: `Water Quality Trend – ${parameter}`,
        font: { size: 16, weight: "bold" },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: `${parameter} Level`,
        },
      },
    },
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        padding: "20px",
        margin: "20px auto",
        maxWidth: "800px",
      }}
    >
      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor="parameter"
          style={{ fontWeight: "600", marginRight: "10px" }}
        >
          Select Parameter:
        </label>
        <select
          id="parameter"
          value={parameter}
          onChange={(e) => onParameterChange(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        >
          {Object.keys(data[0].parameters).map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div style={{ height: "400px" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default ChartView;
