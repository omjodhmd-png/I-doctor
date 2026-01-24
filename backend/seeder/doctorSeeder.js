import sequelize from "../config/db.js";
import Doctor from "../models/doctor.js";
import User from "../models/user.js";

const doctorsData = [
  {
    userId: 1,
    fullName: "Dr. Ahmed Benali",
    speciality: "Cardiologist",
    bio: "Specialist in heart diseases with 10 years of experience.",
    imageUrl: "https://i.pinimg.com/736x/86/c5/fd/86c5fd973bbce56c60d6747e592913db.jpg",
    clinicName: "Heart Care Clinic",
    experience: 10,
    languages: "Arabic, French, English",
    availabilityDays: "Mon - Fri",
    consultationDuration: 30,
    certifications: "Cardiology Board Certified",
    workTime: "09:00 - 17:00",
    phone: "0612345678",
    address: "Casablanca",
    rating: 4.5,
    price: 300,
    isAvailable: true,
    latitude: 33.5731,
    longitude: -7.5898,
  },
  {
    userId: 2,
    fullName: "Dr. Sara El Amrani",
    speciality: "Dermatologist",
    bio: "Expert in skin care and dermatology.",
    imageUrl: "https://i.pinimg.com/736x/a8/43/ef/a843ef1d16fc3ed5263f28da06a26df6.jpg",
    clinicName: "Skin Beauty Center",
    experience: 8,
    languages: "Arabic, French",
    availabilityDays: "Mon - Sat",
    consultationDuration: 20,
    certifications: "Dermatology Specialist Certificate",
    workTime: "10:00 - 18:00",
    phone: "0623456789",
    address: "Rabat",
    rating: 4.7,
    price: 250,
    isAvailable: true,
    latitude: 34.020882,
    longitude: -6.84165,
  },
];

const seedDoctors = async () => {
  try {
    await sequelize.authenticate();

    await User.sync();
    await Doctor.sync({ force: true });

    await Doctor.bulkCreate(doctorsData);
    console.log(" Doctors seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error(" Doctors seeding error:", err);
    process.exit(1);
  }
};

seedDoctors();
