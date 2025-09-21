import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapView({ data }) {
  if (!data || data.length === 0) return null;

  // Last entry per location
  const latestData = {};
  data.forEach((d) => (latestData[d.location] = d));

  return (
    <MapContainer
      center={[25.3176, 82.9739]}
      zoom={6}
      style={{ height: "400px", backgroundColor:"white", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {Object.values(latestData).map((d, idx) => (
        <Marker
          key={idx}
          position={[25 + idx, 82 + idx] /* Replace with real coords */}
        >
          <Popup>
            <strong>{d.location}</strong>
            <br />
            DO: {d.parameters.DO}
            <br />
            BOD: {d.parameters.BOD}
            <br />
            Nitrate: {d.parameters.Nitrate}
            <br />
            Fecal Coliform: {d.parameters.FecalColiform}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;
