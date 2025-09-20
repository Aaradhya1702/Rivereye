import React, { useState, useEffect } from 'react';
import { getLocations, getLocationData, getAlerts } from '../api/api';
import MapView from '../components/MapView';
import ChartView from '../components/ChartView';
import AlertsPanel from '../components/AlertsPanel';

function Dashboard() {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [data, setData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [parameter, setParameter] = useState('DO');

  useEffect(() => {
    getLocations().then(res => {
      // setLocations(res.data);
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
    <div style={{ padding: '20px' }}>
      <MapView data={data} />
      <ChartView data={data} parameter={parameter} onParameterChange={setParameter} />
      <AlertsPanel alerts={alerts} />
    </div>
  );
}

export default Dashboard;
