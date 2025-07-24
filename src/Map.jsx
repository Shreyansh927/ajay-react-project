import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 20.8428826, // Example: Delhi
  lng: 75.5261246,
};

const Map = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCporzk6rNOwoWGKeeDI_oK_qJ8d2k0d84">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
