import React, { useState, useEffect } from "react";
import { getLocationData, getAlerts } from "../authService";
import MapView from "../components/MapView";
import ChartView from "../components/ChartView";
import AlertsPanel from "../components/AlertsPanel";
import ParameterCards from "../components/ParameterCard";
import Heatmap from "../components/Heatmap";
import ExportButton from "../components/Export";
import ForecastPanel from "../components/ForecastPanel";
import MonthlyComparison from "../components/MonthlyComparison";
import RHIGauge from "../components/RHIGauge";
import audioFile from "../images/stream-3.mp3";
import ForecastMultiPanel from "../components/ForecastMultiPanel";
import { useRef } from "react";
import CityComparisonPanel from "../components/CityComparisonPanel";
import CityLevelComparison from "../components/CityComparison";

function Dashboard() {
  const audioRef = useRef(null);
  const cities = ["Varanasi", "Haridwar", "Kolkata", "Patna", "Kanpur"];
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [data, setData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [parameter, setParameter] = useState("DO");

  useEffect(() => {
    if (selectedCity) {
      getLocationData(selectedCity).then((res) => setData(res.data));
      getAlerts().then((res) => setAlerts(res.data));
    }
  }, [selectedCity]);

  // play sound after user interaction
  useEffect(() => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.volume = 0.2; // subtle background sound
      audioRef.current.play().catch(() => console.log("Autoplay blocked"));
    }
  }, [soundEnabled]);

  return (
    <div className="relative mt-24 p-4 overflow-hidden">
      <audio ref={audioRef} src={audioFile} loop />

      {/* Mute/Play button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="px-4 py-2 bg-sky-500 text-white rounded-xl shadow-md hover:bg-sky-600 transition"
        >
          {soundEnabled ? "🔊 Mute" : "🎵 Play Sound"}
        </button>
      </div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-sky-700">
          🌊 Water Quality Dashboard
        </h2>
        <div className="flex gap-3 items-end">
          <div className="flex items-center">
            <label></label>
            <ExportButton city={selectedCity} />
          </div>
          <div className="flex flex-col gap-1">
            <label>Select Parameter</label>
            <select
              id="parameter"
              value={parameter}
              onChange={(e) => setParameter(e.target.value)}
              className="px-2 py-1 rounded-md border border-gray-300 text-sm focus:ring-2 focus:ring-sky-400"
            >
              {Object.keys(data[0]?.parameters ?? []).map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label>Select City</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-2 py-1 rounded-md border border-gray-300 text-sm focus:ring-2 focus:ring-sky-400"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Parameter Summary Cards */}
      <ParameterCards location={selectedCity} />

      {/* Main Grid */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {/* Map */}
        <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 text-center mb-3">
            Water Quality Map
          </h3>
          <MapView data={data} />
        </div>

        {/* Trends */}
        <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 text-center mb-3">
            Parameter Trends
          </h3>
          <ChartView
            data={data}
            parameter={parameter}
          />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {/* Map */}
        <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
          <ForecastPanel location={selectedCity} parameter={parameter} />
        </div>

        {/* Trends */}
        <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
          <Heatmap data={data} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {/* RHI Gauge */}
        <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
          <h3 className="text-red-600 font-semibold mb-3">📊 River Health Index</h3>
          <RHIGauge location={selectedCity} />
        </div>

        {/* Monthly Comparison */}
        <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
          <h3 className="text-red-600 font-semibold mb-3">📊 Monthly Comparison</h3>
          <MonthlyComparison location={selectedCity} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {/* City Comparison Panel */}
        <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
          <h3 className="text-red-600 font-semibold mb-3">📊 City Comparison</h3>
          <CityComparisonPanel />
        </div>

        {/* Forecast Multi Panel */}
        <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
          <h3 className="text-red-600 font-semibold mb-3">📊 Forecast Multi Panel</h3>
          <ForecastMultiPanel location={selectedCity} />
        </div>
      </div>

       <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
          <h3 className="text-red-600 font-semibold mb-3">📊 City Level Comparison</h3>
          <CityLevelComparison  />
        </div>

      {/* Alerts */}
      <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
        <h3 className="text-red-600 font-semibold mb-3">🚨 Alerts</h3>
        <AlertsPanel alerts={alerts} />
      </div>
    </div>
  );
}

export default Dashboard;
