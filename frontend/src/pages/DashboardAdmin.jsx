import React, { useState } from "react";
import { FiUsers, FiBell, FiSettings, FiDownload, FiMap } from "react-icons/fi";
import CityComparisonPanel from "../components/CityComparisonPanel";
import ForecastMultiPanel from "../components/ForecastMultiPanel";
import AlertsPanel from "../components/AlertsPanel";

const DashboardAdminModern = () => {
  const [selectedCity, setSelectedCity] = useState("Kanpur");
  const [notifications, setNotifications] = useState([
    { id: 1, message: "DO crossed threshold in Haridwar", read: false },
    { id: 2, message: "New user registered: Abhi Jain", read: false },
  ]);
  const users = [
    { id: 1, name: "Admin", role: "Super Admin" },
    { id: 2, name: "User1", role: "Analyst" },
  ]
  const [exportFormat, setExportFormat] = useState("CSV");
  const [soundEnabled, setSoundEnabled] = useState(false);

  const cities = ["Varanasi", "Haridwar", "Kolkata", "Patna", "Kanpur"];

  const toggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-[100px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-sky-700">🌊 Water Quality Admin</h1>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <select
            className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
            value=""
            onChange={(e) => {
              const id = Number(e.target.value);
              if (id) toggleRead(id);
            }}
          >
            <option value="" disabled>
              <FiBell size={24} /> Notifications
              {notifications.some((n) => !n.read) ? " •" : ""}
            </option>
            {notifications.length === 0 ? (
              <option disabled>No notifications</option>
            ) : (
              notifications.map((n) => (
                <option
                  key={n.id}
                  value={n.id}
                  className={n.read ? "opacity-50" : ""}
                >
                  {n.message} {n.read ? "✓" : "•"}
                </option>
              ))
            )}
          </select>
          <button className="flex items-center gap-1 px-3 py-2 bg-white rounded-xl shadow hover:bg-gray-100 transition">
            <FiUsers /> Users
          </button>

          {/* Export */}
          <div className="flex items-center gap-1 px-3 py-2 bg-white rounded-xl shadow hover:bg-gray-100 transition">
            <FiDownload /> Export:
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              className="ml-2 border rounded px-1"
            >
              <option value="CSV">CSV</option>
              <option value="Excel">Excel</option>
              <option value="PDF">PDF</option>
            </select>
          </div>

          {/* Settings */}
          <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition">
            <FiSettings size={24} />
          </button>
        </div>
      </div>

      {/* City Selector */}
      <div className="mb-6 flex gap-4 items-center">
        <FiMap size={20} />
        <select
          className="px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Main Panels */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* City Comparison */}
        <div className="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition">
          <CityComparisonPanel />
        </div>

        {/* Forecast Multi Panel */}
        <div className="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition">
          <ForecastMultiPanel location={selectedCity} />
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition md:col-span-2">
          <h3 className="text-red-600 font-semibold mb-3">🚨 Alerts</h3>
          <AlertsPanel alerts={[]} />
        </div>
      </div>

      {/* Footer / Config */}
      <div className="mt-6 flex justify-between items-center bg-white p-4 rounded-2xl shadow">
        <div>
          <p className="text-gray-600">Sound:</p>
          <button
            className="px-3 py-1 bg-sky-500 text-white rounded-xl shadow hover:bg-sky-600 transition"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? "🔊 Enabled" : "🔇 Disabled"}
          </button>
        </div>
        <div>
          <p className="text-gray-600">Total Users: {users.length}</p>
        </div>
        <div>
          <p className="text-gray-600">Export Format: {exportFormat}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminModern;
