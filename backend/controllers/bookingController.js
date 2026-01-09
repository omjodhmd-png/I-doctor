import Booking from "../models/booking.js";
import Doctor from "../models/doctor.js";
import User from "../models/user.js";
import { Op } from "sequelize";

/**
 * ✅ Create new booking
 * userId كيجي من auth (req.user.id)
 */
export const createBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const { doctorId, bookingDate, bookingTime, notes } = req.body;

    // تحقق من الطبيب
    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // تحقق واش الوقت محجوز
    const existingBooking = await Booking.findOne({
      where: {
        doctorId,
        bookingDate,
        bookingTime,
        status: { [Op.in]: ["Pending", "Confirmed"] },
      },
    });

    if (existingBooking) {
      return res.status(400).json({ message: "This time slot is already booked" });
    }

    const booking = await Booking.create({
      userId,
      doctorId,
      bookingDate,
      bookingTime,
      price: doctor.price,
      notes,
      status: "Pending",
    });

    return res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * 📋 Get bookings of logged user
 */
export const getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.findAll({
      where: { userId },
      include: [{ model: Doctor }],
      order: [["bookingDate", "ASC"], ["bookingTime", "ASC"]],
    });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * 👨‍⚕️ Get bookings of doctor
 */
export const getDoctorBookings = async (req, res) => {
  try {
    const doctorId = req.user.id; // assuming doctor is logged in
    const bookings = await Booking.findAll({
      where: { doctorId },
      include: [{ model: User }],
      order: [["bookingDate", "ASC"], ["bookingTime", "ASC"]],
    });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getDoctorTotalBookings = async (req, res) => {
  try {
    const { doctorId } = req.params;

    // security: غير الطبيب يشوف راسو
    if (req.user.role !== "doctor" || req.user.id != doctorId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const total = await Booking.count({
      where: { doctorId },
    });  

    res.json({ totalBookings: total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getDoctorConfirmedToday = async (req, res) => {
  try {
    const { doctorId } = req.params;

    // غير الطبيب يشوف راسو
    if (req.user.role !== "doctor" || req.user.id != doctorId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const today = new Date().toISOString().split("T")[0];

    const total = await Booking.count({
      where: {
        doctorId,
        status: "Confirmed",
        bookingDate: today,
      },
    });

    res.json({ confirmedToday: total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getDoctorBookingsSorted = async (req, res) => {
  try {
    const doctorId = req.user.id;

    // غير الطبيب
    if (req.user.role !== "doctor") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const bookings = await Booking.findAll({
      where: { doctorId },
      include: [{ model: User, attributes: ["id", "fullName"] }],
      order: [
        ["bookingDate", "DESC"], // آخر تاريخ يطلع الأول
        ["bookingTime", "DESC"], // آخر وقت يطلع الأول
      ],
    });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * 🔄 Update booking status
 * Doctor confirms or cancels
 */
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Confirmed", "Cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Only doctor can confirm/cancel
    if (req.user.role !== "doctor" || req.user.id !== booking.doctorId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    booking.status = status;
    await booking.save();

    res.json({ message: "Booking status updated", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



/**
 * ❌ Cancel booking (by user)
 */
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Only user who created the booking can cancel
    if (req.user.role !== "user" || req.user.id !== booking.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    booking.status = "Cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * 🔍 Get booking by ID
 */
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByPk(id, {
      include: [{ model: Doctor }, { model: User }],
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Only user or doctor involved can see
    if (req.user.id !== booking.userId && req.user.id !== booking.doctorId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
