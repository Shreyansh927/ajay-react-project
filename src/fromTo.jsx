import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapWithRoute = () => {
  const [routeCoords, setRouteCoords] = useState([]);
  const [position, setPosition] = useState(null);
  const [dist, setDist] = useState(0);
  const destination = [28.7041, 77.1025]; // Delhi (latitude, longitude)
  const apiKey =
    "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjgxYzgyMTgwMzM0YTQ4NzZhOWFmM2NlYTc1YjA3YWZmIiwiaCI6Im11cm11cjY0In0=";

  useEffect(() => {
    // Get current location
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setPosition([lat, lng]);

        const res = await fetch(
          `https://api.openrouteservice.org/v2/directions/foot-walking?api_key=eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjgxYzgyMTgwMzM0YTQ4NzZhOWFmM2NlYTc1YjA3YWZmIiwiaCI6Im11cm11cjY0In0=&start=${lng},${lat}&end=${destination[1]},${destination[0]}`
        );
        const data = await res.json();
        const dist1 = data.features[0].properties.segments[0].distance;
        setDist(dist1)
        console.log("Distance:", dist, "meters");

        const coords = data.features[0].geometry.coordinates.map((coord) => [
          coord[1], // lat
          coord[0], // lng
        ]);
        setRouteCoords(coords);
      },
      (err) => {
        console.error("Geolocation error:", err);
      }
    );
  }, []);

  return (
    <div>
      {position && (
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "80vh", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />
          <Marker position={position} />
          <Marker position={destination} />
          {routeCoords.length > 0 && (
            <Polyline positions={routeCoords} color="red" />
          )}
        </MapContainer>
      )}
      <h1>{dist}</h1>
    </div>
  );
};

export default MapWithRoute;
