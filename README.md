# AgriPulse — Smart Grain Storage System

> **Objective / Purpose**
>
> * To minimize post-harvest losses among small-scale farmers by developing a smart storage and crop management system that leverages IoT and AI technologies to monitor environmental conditions, predict crop yield, and improve market connectivity.

---

## 🌟 Project Title

**AgriPulse: Smart Grain Storage System**

---

## 🚀 Brief Abstract (≈10 lines)

* Small-scale farmers face large post-harvest losses due to poor storage and limited market access.
* AgriPulse is a Smart Agriculture Platform integrating IoT sensors and AI-driven analytics for end-to-end crop & storage management.
* IoT monitors temperature, humidity, and pest activity in real-time to trigger preventive alerts.
* Machine Learning models predict yield and advise crop rotation for sustainable output.
* An AI chatbot provides personalized, context-aware farming guidance to farmers.
* A built-in marketplace connects farmers directly with buyers and suppliers.
* Cloud storage (MongoDB Atlas) stores sensor telemetry and analytics results securely.
* The platform is mobile-first and responsive for rural smartphone usage.
* Emphasis on affordability — uses low-cost IoT hardware (Arduino/ESP) and lightweight ML models.
* Outcome: reduced spoilage, informed decision-making, and improved farmer income.

---

## 🔑 Salient Features

* **IoT-enabled smart storage**: real-time monitoring of temperature, humidity, and pest activity.
* **AI-based crop yield prediction** using environmental & historical data.
* **Dynamic crop rotation planning** for sustainable farming.
* **AI Chatbot** for decision support and farming assistance.
* **Integrated e‑commerce marketplace** for produce and supplies.
* **Real-time alerts & notifications** (SMS/Email/Push) for threshold breaches.
* **Role-based access**: Farmer, Admin, Buyer (auth-protected).
* **Lightweight mobile UI** with offline-first considerations.

---

## 🧰 Technology Stack

| Layer       | Technologies                                                                    |
| ----------- | ------------------------------------------------------------------------------- |
| Frontend    | React (Vite), Tailwind CSS, Framer Motion, React Router                         |
| Backend     | Node.js, Express.js                                                             |
| Database    | MongoDB Atlas (cloud)                                                           |
| IoT         | Arduino / ESP32, Sensors (DHT22, MH-Z19, vibration/pest sensor), MQTT/WebSocket |
| ML/AI       | Python (scikit-learn / TensorFlow Lite for edge), Node ML service               |
| Hosting     | Vercel / Netlify (frontend), Heroku / Railway / DigitalOcean (backend)          |
| Forms/Email | Formspree / Nodemailer                                                          |

---

## ✨ Novelty 

1. Combines smart storage monitoring with predictive analytics in one platform.
2. Affordable IoT + cloud approach makes advanced tech accessible to small farmers.
3. AI-driven spoilage prediction and rotation planning — proactive loss prevention.
4. Integrated marketplace closes the supply-chain loop for farmers.
5. Lightweight on-device inference (TFLite) for low-bandwidth, offline-friendly predictions.

---

## 👥 Target Audience / Market Segment

* Small and medium-scale farmers
* Agricultural cooperatives and farmer producer organizations (FPOs)
* Rural supply-chain aggregators and local buyers
* NGOs and government agricultural extension services

## 🎛️ UI & Animation Notes

* Use **Framer Motion** for entry fades, staggered card reveals, and FAQ accordion motion.
* Use **Tailwind** utilities + glassmorphism cards for modern aesthetic.
* Keep hover/flip interactions subtle and accessible (prefers-reduced-motion support).

---

## 🧩 Quick Dev Setup (commands)

```bash
# Backend
cd server
npm install
node server.js

# Frontend
cd client
npm install
npm run dev
```

---

## 📌 How to Use (UX flow — bullet steps)

* Landing page → Sign up / Login (token created)
* Dashboard → Add storage unit (sensor pairing)
* Live view → monitor sensor telemetry + alerts
* Predictions → open ML panel for yield and spoilage forecasts
* Marketplace → list produce / browse buyers
* Support → chat with AI assistant

---

