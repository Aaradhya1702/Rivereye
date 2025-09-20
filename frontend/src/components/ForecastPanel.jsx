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
    <div style={{ background: "#f1f1f1", padding: "15px", borderRadius: "10px", marginBottom: "20px" }}>
      <h3 style={{ textAlign: "center" }}>
        {parameter} Forecast for {location}
      </h3>
      <Line data={chartData} />
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "15px" }}>
        <div style={{ padding: "10px", background: "#fff", borderRadius: "8px", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>
          <strong>Min Predicted:</strong> {Math.min(...forecast.map((f) => f.predicted)).toFixed(2)}
        </div>
        <div style={{ padding: "10px", background: "#fff", borderRadius: "8px", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>
          <strong>Max Predicted:</strong> {Math.max(...forecast.map((f) => f.predicted)).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default ForecastPanel;
