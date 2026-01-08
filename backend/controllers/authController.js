import User from "../models/user.js";
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

    // 🔑 Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // صلاحية أسبوع
    );

    res.status(201).json({
      message: "User registered successfully",
      token, // 🟢 هنا كنرسل token
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