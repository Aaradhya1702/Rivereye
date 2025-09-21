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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ForecastPanel = ({ location, parameter }) => {
  const [data, setData] = useState([]);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    if (!location || !parameter) return;

    axios
      .get(`http://localhost:5000/api/water/forecast/${location}/${parameter}`)
      .then((res) => {
        setData(res.data.lastData);
        setForecast(res.data.forecast);
      })
      .catch((err) => console.error(err));
  }, [location, parameter]);

  if (!data || data.length === 0) return <p>No forecast data</p>;

  const labels = [
    ...data.map((d) => new Date(d.date).toLocaleDateString()),
    ...forecast.map((f, idx) => `Day +${idx + 1}`),
  ];
  const historicalValues = data.map((d) => d.parameters[parameter]);
  const predictedValues = new Array(data.length).fill(null).concat(forecast.map((f) => f.predicted));

  const chartData = {
    labels,
    datasets: [
      {
        label: "Historical",
        data: historicalValues.concat(new Array(forecast.length).fill(null)),
        borderColor: "blue",
        backgroundColor: "rgba(0, 123, 255,0.1)",
        tension: 0.2,
      },
      {
        label: "Predicted",
        data: predictedValues,
        borderColor: "red",
        borderDash: [5, 5],
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition flex flex-col">
      <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">
        {parameter} Forecast – {location}
      </h3>
      <div className="h-[350px]">
        <Line data={chartData} />
      </div>
      <div className="flex justify-center gap-6 mt-4">
        <div className="px-4 py-2 bg-sky-50 border border-sky-200 rounded-lg">
          <strong>Min:</strong>{" "}
          {Math.min(...forecast.map((f) => f.predicted)).toFixed(2)}
        </div>
        <div className="px-4 py-2 bg-sky-50 border border-sky-200 rounded-lg">
          <strong>Max:</strong>{" "}
          {Math.max(...forecast.map((f) => f.predicted)).toFixed(2)}
        </div>
      </div>
    </div>

  );
};

export default ForecastPanel;
