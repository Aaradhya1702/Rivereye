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

  const labels = data.map((d) => d.date);
  const values = data.map((d) => d.parameters[parameter]);
  const forecast = data.map((d) => d.forecast[parameter]);

  const chartData = {
    labels,
    datasets: [
      {
        label: `${parameter} (Actual)`,
        data: values,
        borderColor: "blue",
        tension: 0.2,
      },
      {
        label: `${parameter} (Forecast)`,
        data: forecast,
        borderColor: "red",
        borderDash: [5, 5],
        tension: 0.2,
      },
    ],
  };

  return (
    <div>
      <select
        value={parameter}
        onChange={(e) => onParameterChange(e.target.value)}
      >
        {Object.keys(data[0].parameters).map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <Line data={chartData} />
    </div>
  );
}

export default ChartView;
