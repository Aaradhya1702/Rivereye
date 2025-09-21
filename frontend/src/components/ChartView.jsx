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

function ChartView({ data, parameter }) {
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
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-700">
          Water Quality Trend – {parameter}
        </h3>
       
      </div>
      <div className="h-[350px]">
        <Line data={chartData} options={options} />
      </div>
    </div>

  );
}

export default ChartView;
