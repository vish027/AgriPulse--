// backend/Routes/predictionRoutes.js
import express from "express";
import cropData from "../data/cropData.js";

const router = express.Router();



router.post("/", async (req, res) => {
  try {
    const input = req.body; // { nitrogen, phosphorus, potassium, ph, rainfall, temperature }
    console.log(input);

    
    // Calculate suitability score for each crop
    // const scores = cropData.map((crop) => {
    //   let score = 0;
    //   let conditions = crop.idealConditions;

    //   // Check each condition against range { min, max }
    //   if (input.ph >= conditions.ph.min && input.ph <= conditions.ph.max) score++;
    //   if (input.rainfall >= conditions.rainfall.min && input.rainfall <= conditions.rainfall.max) score++;
    //   if (input.temperature >= conditions.temperature.min && input.temperature <= conditions.temperature.max) score++;
    //   if (input.nitrogen >= conditions.nitrogen.min && input.nitrogen <= conditions.nitrogen.max) score++;
    //   if (input.phosphorus >= conditions.phosphorus.min && input.phosphorus <= conditions.phosphorus.max) score++;
    //   if (input.potassium >= conditions.potassium.min && input.potassium <= conditions.potassium.max) score++;

    //   let suitability = Math.round((score / 6) * 100);

    //   return {
    //     name: crop.name,
    //     image: crop.image,
    //     suitability,
    //   };
    // });

    // Sort and pick top 3
    // const topCrops = scores.sort((a, b) => b.suitability - a.suitability).slice(0, 3);

    res.json(topResults);
  } catch (err) {
    console.error("Error in prediction:", err);
    res.status(500).json({ error: "Failed to predict crops" });
  }
});

export default router;
