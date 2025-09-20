import React, { useState, useEffect } from 'react';
import { getLocationData, getAlerts } from '../api/api';
import MapView from '../components/MapView';
import ChartView from '../components/ChartView';
import AlertsPanel from '../components/AlertsPanel';
import ParameterCards from '../components/ParameterCard';
import Heatmap from '../components/Heatmap';
import { Select } from 'antd';
import ExportButton from '../components/Export';

const { Option } = Select;

function Dashboard() {
  const cities = ['Varanasi', 'Haridwar', 'Kolkata', 'Patna', 'Kanpur'];
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [data, setData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [parameter, setParameter] = useState('DO');

  useEffect(() => {
    if (selectedCity) {
      getLocationData(selectedCity).then(res => setData(res.data));
      getAlerts().then(res => setAlerts(res.data));
    }
  }, [selectedCity]);

  return (
    <div style={{ padding: '20px', maxWidth: '1300px', margin: '80px auto 0 auto' }}>
      
      {/* City Selector */}
      <div style={{ marginBottom: '20px', width:"100%", alignItems:"center", display: 'flex', justifyContent: 'space-between' }}>
        <h4>Water Quality Dashboard</h4>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <ExportButton city={selectedCity} />
        <select
          value={selectedCity}
          onChange={e => setSelectedCity(e.target.value)}
          style={{
            borderRadius: "6px",
            minWidth: "150px",
            height: "35px",
            border: "1px solid #ccc",
          }}
          placeholder="Select City"
        >
          {cities.map(city => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        </div>
      </div>

      {/* Parameter Summary Cards */}
      <ParameterCards location={selectedCity} />

      {/* Map, Chart & Heatmap */}
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', margin: '20px 0px' }}>
        <div style={{ flex: 1, minWidth: '400px', background: '#f1f1f1', borderRadius: '10px', padding: '10px' }}>
          <h3 style={{ textAlign: 'center' }}>Water Quality Map</h3>
          <MapView data={data} />
        </div>
        <div style={{ flex: 1, minWidth: '400px', background: '#f1f1f1', borderRadius: '10px', padding: '10px' }}>
          <h3 style={{ textAlign: 'center' }}>Parameter Trends</h3>
          <ChartView data={data} parameter={parameter} onParameterChange={setParameter} />
        </div>
      </div>
        <div style={{ flex: 1, minWidth: '400px', background: '#f1f1f1', borderRadius: '10px', padding: '10px' }}>
          <h3 style={{ textAlign: 'center' }}>Heatmap</h3>
          <Heatmap data={data} />
        </div>

      {/* Alerts Panel */}
      <div style={{
        background: '#fff3f3',
        padding: '15px',
        borderRadius: '10px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ color: 'red', marginBottom: '10px' }}>Alerts</h3>
        <AlertsPanel alerts={alerts} />
      </div>
    </div>
  );
}

export default Dashboard;
