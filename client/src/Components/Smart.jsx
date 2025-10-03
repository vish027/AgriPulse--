import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate

export default function ESP32Data() {
  const [data, setData] = useState(null);
  const [output, setOutput] = useState("Click 'Get Data' to fetch sensor readings.");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // 2. Initialize useNavigate

  const tableStyles = {
    container: {
      margin: '20px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      maxWidth: '400px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9f9f9',
      textAlign: 'center',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '15px',
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    },
    th: {
      border: '1px solid #ddd',
      padding: '10px',
      textAlign: 'left',
      backgroundColor: '#4CAF50',
      color: 'white',
    },
    td: {
      border: '1px solid #ddd',
      padding: '10px',
      textAlign: 'left',
      backgroundColor: '#e6ffe6', // Light green background for data rows
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      transition: 'background-color 0.3s',
      margin: '0 10px', // Added margin for spacing
    },
    backButton: { // New style for the back button
      padding: '10px 15px',
      fontSize: '16px',
      cursor: 'pointer',
      backgroundColor: '#555',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      transition: 'background-color 0.3s',
      marginRight: '10px',
    }
  };

  const getData = async () => {
    setOutput("Fetching data...");
    setData(null);
    setLoading(true);
    
    try {
      // NOTE: Using a private IP address here. Ensure your device is on this network.
      const response = await fetch("http://192.168.1.24/data"); 
      
      if (!response.ok) {
        throw new Error("HTTP error! Status: " + response.status);
      }
      
      const fetchedData = await response.json();
      setData(fetchedData);
      setOutput("Data fetched successfully.");

    } catch (error) {
      console.error("Error:", error);
      setOutput("Error fetching data! Please check the ESP32 connection.");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  // Handler to navigate back to the main website
  const handleBack = () => {
    navigate('/agriculture-website');
  };

  // Function to render the data table
  const renderDataTable = () => {
    if (!data) return null;

    // Custom formatting for the IR Sensor field
    const irStatus = data.ir === 1 ? "Detected" : "Clear";

    return (
      <table style={tableStyles.table}>
        <thead>
          <tr>
            <th style={tableStyles.th}>Sensor</th>
            <th style={tableStyles.th}>Reading</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tableStyles.td}>Temperature</td>
            <td style={tableStyles.td}>{data.temperature} °C</td>
          </tr>
          <tr>
            <td style={tableStyles.td}>Humidity</td>
            <td style={tableStyles.td}>{data.humidity} %</td>
          </tr>
          <tr>
            <td style={tableStyles.td}>IR Sensor</td>
            <td style={tableStyles.td}>{irStatus}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <div style={tableStyles.container}>
      <h2>ESP32 Sensor Data</h2>
      
      {/* Back Button Added */}
      <div>
        <button 
          onClick={handleBack} 
          style={tableStyles.backButton} 
        >
          &larr; Back
        </button>
        <button 
          onClick={getData} 
          style={tableStyles.button} 
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Data"}
        </button>
      </div>
      
      {/* Display the status message */}
      <p style={{ marginTop: '15px', color: loading ? '#007bff' : (data ? '#4CAF50' : '#dc3545') }}>
        {output}
      </p>

      {/* Render the table if data is available */}
      {renderDataTable()}
    </div>
  );
}