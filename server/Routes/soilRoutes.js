import express from "express";
import SoilCondition from "../Models/soilCondition.js";
import cropData from "../data/cropData.js";

const router = express.Router();

  const calculateScore = (crop, input) => {
    let score = 0;
    const totalConditions = Object.keys(crop.idealConditions).length;

    for (const [key, range] of Object.entries(crop.idealConditions)) {
      const value = input[key];
      if (value >= range.min && value <= range.max) score += 1;
      else {
        const distance = Math.min(
          Math.abs(value - range.min),
          Math.abs(value - range.max)
        );
        const penalty = distance / (range.max - range.min);
        score += 1 - penalty;
      }
    }
    return score / totalConditions;
  };

router.post("/", async (req, res) => {
  try {
    // ✅ Parse numbers to avoid string vs number mismatch
    const input = {
      nitrogen: Number(req.body.nitrogen),
      phosphorus: Number(req.body.phosphorus),
      potassium: Number(req.body.potassium),
      ph: Number(req.body.ph),          // make sure frontend sends `ph`
      rainfall: Number(req.body.rainfall),
      temperature: Number(req.body.temperature),
    };

    console.log(input);

    // ✅ Save soil data
    const soilCondition = new SoilCondition(input);
    await soilCondition.save();

    // ✅ Filter crops
    const cropScores=cropData.map((crop)=>({
      crop,
      score:calculateScore(crop,input)
    }))

    cropScores.sort((a, b) => b.score - a.score);
    const topResults = cropScores.slice(0, 3);
    console.log(topResults)

    res.status(201).json(
      topResults.length > 0
        ? topResults
        : [{ name: "No suitable crop found", image: "/images/no-crop.png" }]
    );

  } catch (error) {
    console.error("❌ Error in soilRoutes:", error);
    res.status(400).json({ error: error.message });
  }
});

export default router;
