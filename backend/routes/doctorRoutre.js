import express from "express";
import { createDoctor, getAllDoctors, getDoctorById } from "../controllers/doctorController.js";
import { authMiddleware } from "../middleware/auth.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/doctors", authMiddleware, roleMiddleware("doctor"), createDoctor);
router.get("/doctors", getAllDoctors);
router.get("/doctors/:id", getDoctorById);

export default router;
