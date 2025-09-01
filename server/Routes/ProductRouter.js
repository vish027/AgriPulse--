import express from "express";
import ensureAuthenticated from "../Middlewares/Auth.js";

const router = express.Router();

router.get("/", ensureAuthenticated, (req, res) => {
  console.log("---- logged in user detail ---", req.user);

  res.status(200).json([
    {
      name: "mobile",
      price: 10000,
    },
    {
      name: "tv",
      price: 20000,
    },
  ]);
});

export default router;
