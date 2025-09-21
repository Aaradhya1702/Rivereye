import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const colors = {
  DO: "#0d6efd",
  BOD: "#dc3545",
  Nitrate: "#fd7e14",
  FecalColiform: "#198754"
};

const CityComparisonPanel = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/water/city-comparison")
      .then(res => {
        setData(res.data.comparison);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return <p className="text-center mt-4 text-gray-500">Loading...</p>;
  if (!data.length) return <p className="text-center mt-4 text-gray-500">No data available</p>;

  const labels = data.map(d => d.city);
  const parameters = Object.keys(colors);

  const datasets = parameters.map(param => ({
    label: param,
    data: data.map(d => d[param]),
    backgroundColor: colors[param]
  }));

  // Compute min/max across cities
  const minMax = {};
  parameters.forEach(param => {
    const values = data.map(d => d[param]);
    minMax[param] = {
      min: Math.min(...values).toFixed(2),
      max: Math.max(...values).toFixed(2)
    };
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
        🌊 Average Water Quality – All Cities
      </h3>

      {/* Bar Chart */}
      <div className="h-[400px]">
        <Bar
          data={{ labels, datasets }}
          options={{
            responsive: true,
            plugins: { legend: { position: "top" }, title: { display: false } },
            scales: { y: { beginAtZero: true } }
          }}
        />
      </div>

      {/* Min/Max summary boxes */}
      <div className="flex justify-center gap-6 mt-8 flex-wrap">
        {parameters.map(param => (
          <div
            key={param}
            className="px-5 py-3 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl text-center shadow-md"
          >
            <span className="text-gray-600 font-medium">{param}</span>
            <div className="text-gray-800 font-bold mt-1">Min: {minMax[param].min}</div>
            <div className="text-gray-800 font-bold">Max: {minMax[param].max}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityComparisonPanel;
