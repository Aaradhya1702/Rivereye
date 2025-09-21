import React, { useEffect, useState } from "react";
import axios from "axios";
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const colors = {
  DO: "rgba(0, 123, 255, 1)",
  BOD: "rgba(255, 99, 132, 1)",
  Nitrate: "rgba(255, 159, 64, 1)",
  FecalColiform: "rgba(75, 192, 192, 1)",
};

const ForecastMultiPanel = ({ location }) => {
  const [data, setData] = useState([]);
  const [forecast, setForecast] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!location) return;
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/water/forecast-multi/${location}`)
      .then((res) => {
        setData(res.data.lastData || []);
        setForecast(res.data.forecast || {});
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [location]);

  if (loading) return <p className="text-center text-gray-500 mt-8">Loading forecast...</p>;
  if (!data.length || !Object.keys(forecast).length)
    return <p className="text-center text-gray-500 mt-8">No forecast data available</p>;

  const parameters = Object.keys(forecast);

  // Labels for chart
  const labels = [
    ...data.map((d) => new Date(d.date).toLocaleDateString()),
    ...forecast[parameters[0]].map((f, idx) => `Day +${idx + 1}`),
  ];

  // Prepare datasets (historical + predicted)
  const datasets = parameters.map((param) => {
    const historicalValues = data.map((d) => d.parameters[param]);
    const predictedValues = forecast[param].map((f) => f.predicted);

    return [
      {
        label: `${param} (Historical)`,
        data: historicalValues.concat(new Array(predictedValues.length).fill(null)),
        borderColor: colors[param],
        backgroundColor: colors[param].replace("1)", "0.1)"),
        tension: 0.3,
        pointRadius: 4,
      },
      {
        label: `${param} (Predicted)`,
        data: new Array(historicalValues.length).fill(null).concat(predictedValues),
        borderColor: colors[param],
        borderDash: [5, 5],
        backgroundColor: colors[param].replace("1)", "0.05)"),
        tension: 0.3,
        pointRadius: 3,
      },
    ];
  }).flat();

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 hover:shadow-3xl transition-all flex flex-col">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        3-Day Water Quality Forecast – {location}
      </h2>

      <div className="h-[450px] flex items-center justify-center">
        <Line
          data={{ labels, datasets }}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              tooltip: { mode: "index", intersect: false },
              title: { display: true, text: "Historical vs Predicted Parameters", font: { size: 20 } },
            },
            interaction: { mode: "nearest", axis: "x", intersect: false },
            scales: {
              y: { beginAtZero: false },
              x: { ticks: { autoSkip: true, maxTicksLimit: 20 } },
            },
          }}
        />
      </div>

      {/* Min/Max summary */}
      <div className="flex justify-center gap-6 mt-8 flex-wrap">
        {parameters.map((param) => (
          <div
            key={param}
            className="px-5 py-3 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl text-center shadow-md"
          >
            <span className="text-gray-600 font-medium">{param}</span>
            <div className="text-gray-800 font-bold mt-1">
              Min: {Math.min(...forecast[param].map((f) => f.predicted)).toFixed(2)}
            </div>
            <div className="text-gray-800 font-bold">
              Max: {Math.max(...forecast[param].map((f) => f.predicted)).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastMultiPanel;
