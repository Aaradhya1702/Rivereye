import React, { useEffect, useState } from "react";
import { getMonthlyComparison } from "../authService";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlyComparison = ({ location }) => {
  const [comparison, setComparison] = useState([]);

  useEffect(() => {
    if (location) {
      getMonthlyComparison(location)
        .then((res) => setComparison(res.data.comparison))
        .catch((err) => console.error(err));
    }
  }, [location]);

  if (!comparison || comparison.length === 0) {
    return (
      <div className="bg-white shadow-lg rounded-xl p-6 text-center">
        <p className="text-gray-500">No comparison data available</p>
      </div>
    );
  }

  const labels = comparison.map((c) => c.month);
  const chartData = {
    labels,
    datasets: [
      {
        label: "DO",
        data: comparison.map((c) => c.DO),
        backgroundColor: "rgba(59,130,246,0.7)", // blue
      },
      {
        label: "BOD",
        data: comparison.map((c) => c.BOD),
        backgroundColor: "rgba(239,68,68,0.7)", // red
      },
      {
        label: "Nitrate",
        data: comparison.map((c) => c.Nitrate),
        backgroundColor: "rgba(34,197,94,0.7)", // green
      },
      {
        label: "Fecal Coliform",
        data: comparison.map((c) => c.FecalColiform),
        backgroundColor: "rgba(168,85,247,0.7)", // purple
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 12, weight: "bold" },
          color: "#374151",
        },
      },
      title: {
        display: true,
        text: `Monthly Comparison – ${location}`,
        font: { size: 18, weight: "bold" },
        color: "#111827",
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: { color: "#4B5563", font: { size: 12 } },
      },
      y: {
        stacked: false,
        ticks: { color: "#4B5563", font: { size: 12 } },
      },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mt-6">
      <Bar data={chartData} options={options} />
      <div className="flex justify-center mt-4 space-x-6 text-sm text-gray-600">
        <span>✅ Higher DO = Better Quality</span>
        <span>⚠️ High BOD/Nitrate = Pollution Risk</span>
      </div>
    </div>
  );
};

export default MonthlyComparison;
