import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../Models/User.js";

// ========================= SIGNUP =========================
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists, you can login instead",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Signup successful",
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ========================= LOGIN =========================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    const errorMsg = "Invalid email or password";

    if (!user) return res.status(403).json({ success: false, message: errorMsg });

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual)
      return res.status(403).json({ success: false, message: errorMsg });

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // ✅ send JWT as cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // set to true in production (HTTPS)
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ========================= CHECK AUTH =========================
export const isAuth = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ success: false, message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ success: true, user: decoded });
  } catch (error) {
    console.error("Auth check error:", error.message);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
