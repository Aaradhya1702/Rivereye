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
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const colors = {
  WaterLevel: "#0d6efd",
};

const CityLevelComparison = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // For demo: replace this URL with your backend endpoint
  const API_URL = "http://localhost:5000/api/water/level-comparison";

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setData(res.data.comparison);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-4 text-gray-500">Loading...</p>;
  if (!data.length) return <p className="text-center mt-4 text-gray-500">No data available</p>;

  const labels = data.map((d) => d.city);
  const datasets = Object.keys(colors).map((param) => ({
    label: param,
    data: data.map((d) => d[param]),
    backgroundColor: colors[param],
  }));

  // Calculate min/max for summary boxes
  const minValue = Math.min(...data.map((d) => d.WaterLevel));
  const maxValue = Math.max(...data.map((d) => d.WaterLevel));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
        🌊 Average Water Level – All Cities
      </h3>

      {/* Bar Chart */}
      <div className="h-[400px] flex flex-col items-center justify-center ">
        <Bar
          data={{ labels, datasets }}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              title: { display: false },
            },
          }}
        />
      </div>

      {/* Min/Max Summary Boxes */}
      <div className="flex justify-center gap-6 mt-8 flex-wrap">
        <div className="px-5 py-3 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl text-center shadow-md">
          <span className="text-gray-600 font-medium">Water Level</span>
          <div className="text-gray-800 font-bold mt-1">Min: {minValue.toFixed(2)}</div>
          <div className="text-gray-800 font-bold">Max: {maxValue.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default CityLevelComparison;
