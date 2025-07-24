import React from "react";
import Map from "./Map";
import CL from "./currentLocation";
import MapWithRoute from "./fromTo";

const App = () => {
  return (
    <div>
      <h1>ajay go</h1>

      <h1>ajay</h1>
      <Map />
      <CL />
      <MapWithRoute />
      <p>Welcome to the ajay React project!</p>
      <p>
        This project is set up to demonstrate a simple Google Map integration.
      </p>
      <p>
        Make sure to replace "YOUR_API_KEY_HERE" in Map.jsx with your actual
        Google Maps API key.
      </p>
      <p>Enjoy exploring the map!</p>
    </div>
  );
};

export default App;
