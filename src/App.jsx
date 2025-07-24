import React from "react";
import Map from "./Map";
import CL from "./currentLocation";
import MapWithRoute from "./fromTo";
import Ai from "./groqAi";
const App = () => {
  return (
    <div>
      <Ai />
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
