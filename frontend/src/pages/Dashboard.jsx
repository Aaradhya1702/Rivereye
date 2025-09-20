import React, { useState, useEffect } from 'react';
import { getLocations, getLocationData, getAlerts } from '../api/api';
import MapView from '../components/MapView';
import ChartView from '../components/ChartView';
import AlertsPanel from '../components/AlertsPanel';
import StatusCards from '../components/StatusCard';
import { Select } from 'antd';

const { Option } = Select;

function Dashboard() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [data, setData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [parameter, setParameter] = useState('DO');

  useEffect(() => {
    getLocations().then(res => {
      setLocations(res.data);
      if (res.data.length > 0) setSelectedLocation(res.data[0]);
    });
    getAlerts().then(res => setAlerts(res.data));
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      getLocationData(selectedLocation).then(res => setData(res.data));
    }
  }, [selectedLocation]);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Location Selector */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <Select
          value={selectedLocation}
          onChange={setSelectedLocation}
          style={{ width: 200 }}
          placeholder="Select Location"
        >
          {locations.map(loc => (
            <Option key={loc} value={loc}>
              {loc}
            </Option>
          ))}
        </Select>
      </div>

      {/* Status Cards */}
      <StatusCards data={data} />

      {/* Map and Charts */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <div style={{ flex: 1, minWidth: '400px', height: '400px', background: '#f1f1f1', borderRadius: '10px', padding: '10px' }}>
          <h3 style={{ textAlign: 'center' }}>Water Quality Map</h3>
          <MapView data={data} />
        </div>
        <div style={{ flex: 1, minWidth: '400px', height: '400px', background: '#f1f1f1', borderRadius: '10px', padding: '10px' }}>
          <h3 style={{ textAlign: 'center' }}>Parameter Trends</h3>
          <ChartView data={data} parameter={parameter} onParameterChange={setParameter} />
        </div>
      </div>

      {/* Alerts Panel */}
      <div style={{ background: '#fff3f3', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
        <h3 style={{ color: 'red', marginBottom: '10px' }}>Alerts</h3>
        <AlertsPanel alerts={alerts} />
      </div>
    </div>
  );
}

export default Dashboard;
