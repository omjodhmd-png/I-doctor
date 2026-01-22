import User from "../models/user.js";
import Doctor from "../models/doctor.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const allowedRoles = ["user", "doctor"];
    const userRole = allowedRoles.includes(role) ? role : "user";

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role: userRole,
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } 
    );
  
    res.status(201).json({
      message: "User registered successfully",
      token, 
      role: user.role,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    let doctorId = null;
    if (user.role === "doctor") {
      const doctor = await Doctor.findOne({ where: { userId: user.id } });
      doctorId = doctor?.id || null;
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login success",
      token,
      role: user.role,
      user: 
      {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        doctorId, 
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR 👉", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};