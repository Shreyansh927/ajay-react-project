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
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setPosition([lat, lng]);

        try {
          const response = await fetch(
            `https://corsproxy.io/?https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${lng},${lat}&end=${destination[1]},${destination[0]}`
          );

          const data = await response.json();

          const distanceMeters =
            data.features[0].properties.segments[0].distance;
          setDist(distanceMeters); // update state

          console.log("Distance:", distanceMeters, "meters");

          const coords = data.features[0].geometry.coordinates.map((coord) => [
            coord[1], // latitude
            coord[0], // longitude
          ]);
          setRouteCoords(coords);
        } catch (err) {
          console.error("Error fetching route:", err);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
      }
    );
  }, []);

  useEffect(() => {
    if (dist > 0) {
      console.log("Updated distance state:", dist, "meters");
    }
  }, [dist]);

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
      <h1>Distance: {(dist / 1000).toFixed(2)} km</h1>
    </div>
  );
};

export default MapWithRoute;
