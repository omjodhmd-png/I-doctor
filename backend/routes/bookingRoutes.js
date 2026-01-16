import express from "express";
import {
  createBooking,
  getMyBookings,
  getDoctorBookings,
  getBookingById,
  cancelBooking,
  updateBookingStatus,
  getDoctorTotalBookings,
  getDoctorBookingsSorted,
} from "../controllers/bookingController.js";

import { authMiddleware } from "../middleware/auth.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* =========================
   USER ROUTES
========================= */

// Create booking
router.post("/", authMiddleware, createBooking);

// Get my bookings (user)
router.get("/my", authMiddleware, getMyBookings);

// Cancel booking (user)
router.patch("/:id/cancel", authMiddleware, cancelBooking);



// Get doctor bookings
router.get(
  "/doctor",
  authMiddleware,
  roleMiddleware("doctor"),
  getDoctorBookings
);

// Get doctor bookings sorted
router.get(
  "/doctor/bookings",
  authMiddleware,
  roleMiddleware("doctor"),
  getDoctorBookingsSorted
);

// Get total bookings (doctor)
router.get(
  "/doctor/total-bookings",
  authMiddleware,
  roleMiddleware("doctor"),
  getDoctorTotalBookings
);

// Update booking status (doctor)
router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("doctor"),
  updateBookingStatus
);



// Get single booking by id
router.get("/:id", authMiddleware, getBookingById);

export default router;
