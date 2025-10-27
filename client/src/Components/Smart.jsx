import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/hard.png"; // your actual background image

export default function ESP32Data() {
  const [data, setData] = useState(null);
  const [output, setOutput] = useState("Click 'Get Data' to fetch sensor readings.");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const styles = {
    page: {
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "contain", // ⬅️ keeps image scale, no zoom/stretch
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundColor: "#000", // fallback black
      position: "relative",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.4)", // subtle fade
    },
    container: {
      position: "relative",
      zIndex: 2,
      padding: "25px 35px",
      borderRadius: "12px",
      maxWidth: "550px",
      width: "90%",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.5)",
      backgroundColor: "rgba(0, 0, 0, 0.65)", // transparent black
      color: "white",
      textAlign: "center",
      backdropFilter: "blur(5px)", // glass effect
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "15px",
      backgroundColor: "rgba(255,255,255,0.1)",
    },
    th: {
      border: "1px solid rgba(255,255,255,0.2)",
      padding: "10px",
      backgroundColor: "rgba(76, 175, 80, 0.8)",
      color: "white",
    },
    td: {
      border: "1px solid rgba(255,255,255,0.2)",
      padding: "10px",
      backgroundColor: "rgba(255,255,255,0.1)",
      color: "white",
    },
    button: {
      padding: "10px 20px",
      fontSize: "16px",
      cursor: "pointer",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      margin: "0 10px",
    },
    backButton: {
      padding: "10px 15px",
      fontSize: "16px",
      cursor: "pointer",
      backgroundColor: "#555",
      color: "white",
      border: "none",
      borderRadius: "5px",
      marginRight: "10px",
    },
  };

  const getData = async () => {
    setOutput("Fetching data...");
    setData(null);
    setLoading(true);

    try {
      const response = await fetch("http://10.210.246.112/data");
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

  const handleBack = () => navigate("/agriculture-website");

  const renderDataTable = () => {
    if (!data) return null;
    return (
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Sensor</th>
            <th style={styles.th}>Reading</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={styles.td}>Temperature</td><td style={styles.td}>{data.temperature} °C</td></tr>
          <tr><td style={styles.td}>Humidity</td><td style={styles.td}>{data.humidity} %</td></tr>
          <tr><td style={styles.td}>IR Sensor</td><td style={styles.td}>{data.ir}</td></tr>
          <tr><td style={styles.td}>Water Status</td><td style={styles.td}>{data.waterStatus}</td></tr>
          <tr><td style={styles.td}>Nutrient Level</td><td style={styles.td}>{data.waterPercent}%</td></tr>
        </tbody>
      </table>
    );
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>
      <div style={styles.container}>
        <h2>🌾 ESP32 Sensor Data</h2>
        <div>5555555555555555555555555555555555555555555
          <button onClick={handleBack} style={styles.backButton}>
            &larr; Back
          </button>
          <button onClick={getData} style={styles.button} disabled={loading}>
            {loading ? "Loading..." : "Get Data"}
          </button>
        </div>
        <p style={{ marginTop: "15px", color: loading ? "#87CEFA" : data ? "#90EE90" : "#FF7F7F" }}>
          {output}
        </p>
        {renderDataTable()}
      </div>
    </div>
  );
}
