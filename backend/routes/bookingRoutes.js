import express from "express";
import {
  createBooking,
  getMyBookings,
  getDoctorBookings,
  getBookingById,
  cancelBooking,
  updateBookingStatus,
  getDoctorTotalBookings,
  
} from "../controllers/bookingController.js";

import { authMiddleware } from "../middleware/auth.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createBooking);

router.get("/my", authMiddleware, getMyBookings);

router.patch("/:id/cancel", authMiddleware, cancelBooking);

router.get("/doctor", authMiddleware,roleMiddleware("doctor"),getDoctorBookings);


router.get("/doctor/total-bookings", authMiddleware, roleMiddleware("doctor"), getDoctorTotalBookings);

router.patch("/:id/status", authMiddleware, roleMiddleware("doctor"), updateBookingStatus);

router.get("/:id", authMiddleware, getBookingById);

export default router;
