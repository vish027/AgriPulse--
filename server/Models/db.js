import mongoose from "mongoose";

const mongo_url = process.env.MONGODB_URI; // 👈 same as in .env

if (!mongo_url) {
  console.error("❌ MONGODB_URI is missing. Check your .env file.");
  process.exit(1);
}

mongoose
  .connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected..."))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const db = mongoose.connection;

db.on("error", (err) => console.error("Connection error:", err));
db.once("open", () => console.log("MongoDB connection is open"));

export default db;
