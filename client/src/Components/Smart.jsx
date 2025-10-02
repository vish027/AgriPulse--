import React, { useState } from "react";

export default function ESP32Data() {
  const [output, setOutput] = useState("");

  const getData = async () => {
    setOutput("Fetching data...");
    try {
      const response = await fetch("http://192.168.1.24/data");
      if (!response.ok) {
        throw new Error("HTTP error! Status: " + response.status);
      }
      const data = await response.json();
      setOutput(`
        Temperature: ${data.temperature} °C
        Humidity: ${data.humidity} %
        IR Sensor: ${data.ir}
      `);
    } catch (error) {
      console.error("Error:", error);
      setOutput("Error fetching data!");
    }
  };

  return (
    <div>
      <h2>ESP32 Sensor Data</h2>
      <button onClick={getData}>Get Data</button>
      <p style={{ whiteSpace: "pre-line" }}>{output}</p>
    </div>
  );
}
