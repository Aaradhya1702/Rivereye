import React, { useState } from "react";
import { FiUsers, FiBell, FiSettings, FiDownload, FiMap, FiUpload, FiPlus } from "react-icons/fi";
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
  ];
  const [exportFormat, setExportFormat] = useState("CSV");
  const [bulkFile, setBulkFile] = useState(null);
  const [schemaView, setSchemaView] = useState(false);
  const [addDataOpen, setAddDataOpen] = useState(false);

  const cities = ["Varanasi", "Haridwar", "Kolkata", "Patna", "Kanpur"];

  const toggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setBulkFile(file);
    // TODO: Parse Excel/CSV and preview
    console.log("File uploaded:", file.name);
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

          {/* Users */}
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

      {/* Advanced Configurations */}
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          {/* Add New Data */}
          <button
            className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl shadow hover:bg-gray-100 transition"
            onClick={() => setAddDataOpen(!addDataOpen)}
          >
            <FiPlus /> Add New Data
          </button>

          {/* Bulk Upload */}
          <label className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl shadow hover:bg-gray-100 transition cursor-pointer">
            <FiUpload /> Bulk Upload
            <input
              type="file"
              accept=".csv, .xlsx"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>

          {/* Schema View */}
          <button
            className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl shadow hover:bg-gray-100 transition"
            onClick={() => setSchemaView(!schemaView)}
          >
            Schema Format
          </button>
        </div>

        {/* Conditional Panels */}
        {addDataOpen && (
          <div className="bg-white p-4 rounded-2xl shadow transition">
            <h3 className="font-semibold mb-3">Add New Data</h3>
            {/* Input fields for city/date/parameter */}
            <div className="grid md:grid-cols-4 gap-4">
              <select className="border p-2 rounded">
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <input type="date" className="border p-2 rounded" />
              <input type="number" placeholder="DO / Water Level" className="border p-2 rounded" />
              <button className="bg-sky-500 text-white px-4 py-2 rounded">Add</button>
            </div>
          </div>
        )}

        {schemaView && (
          <div className="bg-white p-4 rounded-2xl shadow transition">
            <h3 className="font-semibold mb-3">Expected Schema</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>location (string)</li>
              <li>date (YYYY-MM-DD)</li>
              <li>parameters: DO, BOD, Nitrate, FecalColiform / waterLevel</li>
              <li>forecast (optional)</li>
            </ul>
          </div>
        )}
      </div>

      {/* Main Panels */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition">
          <CityComparisonPanel />
        </div>
        <div className="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition">
          <ForecastMultiPanel location={selectedCity} />
        </div>
        <div className="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition md:col-span-2">
          <h3 className="text-red-600 font-semibold mb-3">🚨 Alerts</h3>
          <AlertsPanel alerts={[]} />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-between items-center bg-white p-4 rounded-2xl shadow">
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
