import Doctor from "../models/doctor.js";

import { Op } from "sequelize";


export const getAllDoctors = async (req, res) => {
  try {
    const { speciality, search } = req.query;
    let filter = {};

    if (speciality && speciality !== "null") { // إضافة تأكد أنها ليست نص "null"
      filter.speciality = speciality;
    }

    if (search) {
      filter.fullName = {
        [Op.like]: `%${search}%`, // تأكد من استيراد Op
      };
    }

    const doctors = await Doctor.findAll({ where: filter });
    res.json(doctors);
  } catch (err) {
    console.error("Backend Error:", err);
    res.status(500).json({ message: err.message });
  }
};






// GET /doctors/:id
export const getDoctorById = async (req, res) => {
  const { id } = req.params; // id mn URL
  try {
    const doctor = await Doctor.findByPk(id); // Sequelize method bach tjib by primary key
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.error("Error fetching doctor by id:", error);
    res.status(500).json({ message: error.message });
  }
};


export const createDoctor = async (req, res) => {
  try {

   

    const existingDoctor = await Doctor.findOne({ where: { userId: req.user.id } });
    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor profile already exists" });
    }

    // 🔹 تحقق من latitude / longitude
    if (!req.body.latitude || !req.body.longitude) {
      return res.status(400).json({ message: "Please choose location" });
    }


    const doctor = await Doctor.create({
      ...req.body,

      // ⬅️ ضروري يجي من التوكن
      userId: req.user.id,

     
    });

    res.status(201).json(doctor);
  } catch (error) {
    console.error("CREATE DOCTOR ERROR ❌", error);
    res.status(500).json({ message: error.message });
  }
};

