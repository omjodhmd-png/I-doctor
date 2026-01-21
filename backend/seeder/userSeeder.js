import sequelize from "../config/db.js";
import User from "../models/user.js";

const usersData = [
  { fullName: "Ahmed User", email: "ahmed@test.com", password: "password123", role: "doctor" },
  { fullName: "Sara User", email: "sara@test.com", password: "password123", role: "doctor" },
  { fullName: "Youssef User", email: "youssef@test.com", password: "password123", role: "doctor" },
  { fullName: "Sanir User", email: "sanir@test.com", password: "password123", role: "doctor" },
  { fullName: "Hamza User", email: "hamza@test.com", password: "password123", role: "doctor" },
  { fullName: "Touhami User", email: "touhami@test.com", password: "password123", role: "doctor" },
];

const seedUsers = async () => {
  try {
    await sequelize.authenticate();
    await User.sync({ force: true });
    await User.bulkCreate(usersData);
    console.log("✅ Users seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Users seeding error:", err);
    process.exit(1);
  }
};

seedUsers();
