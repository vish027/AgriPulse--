import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ESP32Data() {
  const [data, setData] = useState(null);
  const [output, setOutput] = useState("Click 'Get Data' to fetch sensor readings.");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const tableStyles = {
    container: {
      margin: '20px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      maxWidth: '500px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9f9f9',
      textAlign: 'center',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '15px',
      backgroundColor: 'white',
    },
    th: {
      border: '1px solid #ddd',
      padding: '10px',
      backgroundColor: '#4CAF50',
      color: 'white',
    },
    td: {
      border: '1px solid #ddd',
      padding: '10px',
      backgroundColor: '#e6ffe6',
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      margin: '0 10px',
    },
    backButton: {
      padding: '10px 15px',
      fontSize: '16px',
      cursor: 'pointer',
      backgroundColor: '#555',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      marginRight: '10px',
    }
  };

  // ---------------------- FETCH DATA ----------------------
  const getData = async () => {
    setOutput("Fetching data...");
    setData(null);
    setLoading(true);
    
    try {
      // Replace with your ESP32 IP
      const response = await fetch("http://10.202.111.112/data");
      
      if (!response.ok) throw new Error("HTTP error! Status: " + response.status);
      
      const fetchedData = await response.json();
      setData(fetchedData);
      setOutput("Data fetched successfully.");
    } catch (error) {
      console.error("Error:", error);
      setOutput("Error fetching data! Check the ESP32 connection or IP address.");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------- BACK BUTTON ----------------------
  const handleBack = () => navigate('/agriculture-website');

  // ---------------------- RENDER TABLE ----------------------
  const renderDataTable = () => {
    if (!data) return null;

    // Use the string directly from JSON
    const irStatus = data.ir;

    return (
      <table style={tableStyles.table}>
        <thead>
          <tr>
            <th style={tableStyles.th}>Sensor</th>
            <th style={tableStyles.th}>Reading</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tableStyles.td}>Temperature</td><td style={tableStyles.td}>{data.temperature} °C</td></tr>
          <tr><td style={tableStyles.td}>Humidity</td><td style={tableStyles.td}>{data.humidity} %</td></tr>
          <tr><td style={tableStyles.td}>IR Sensor</td><td style={tableStyles.td}>{irStatus}</td></tr>
          <tr><td style={tableStyles.td}>Water Status</td><td style={tableStyles.td}>{data.waterStatus}</td></tr>
          <tr><td style={tableStyles.td}>Water Depth Raw</td><td style={tableStyles.td}>{data.waterRaw}</td></tr>
          <tr><td style={tableStyles.td}>Water Depth Voltage</td><td style={tableStyles.td}>{data.waterVoltage} V</td></tr>
        </tbody>
      </table>
    );
  };

  // ---------------------- RETURN UI ----------------------
  return (
    <div style={tableStyles.container}>
      <h2>🌾 ESP32 Sensor Data</h2>

      <div>
        <button onClick={handleBack} style={tableStyles.backButton}>
          &larr; Back
        </button>
        <button onClick={getData} style={tableStyles.button} disabled={loading}>
          {loading ? "Loading..." : "Get Data"}
        </button>
      </div>

      <p style={{ marginTop: '15px', color: loading ? '#007bff' : (data ? '#4CAF50' : '#dc3545') }}>
        {output}
      </p>

      {renderDataTable()}
    </div>
  );
}
