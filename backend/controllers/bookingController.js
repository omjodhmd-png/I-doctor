import Booking from "../models/booking.js";
import Doctor from "../models/doctor.js";
import User from "../models/user.js";
import { Op } from "sequelize";
import { Sequelize } from "sequelize";


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
    // كنجيبو الطبيب انطلاقا من الـ id ديال المستخدم اللي مسجل الدخول
    const doctor = await Doctor.findOne({ where: { userId: req.user.id } });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const total = await Booking.count({
      where: { doctorId: doctor.id },
    });

    res.json({ totalBookings: total });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};





export const getDoctorBookingsSorted = async (req, res) => {
  try {
    // 1. التأكد من أن المستخدم طبيب
    if (req.user.role !== "doctor") {
      return res.status(403).json({ message: "غير مصرح لك بالدخول" });
    }

    // 2. البحث عن id الطبيب باستخدام id المستخدم الموجود في التوكن
    const doctor = await Doctor.findOne({ 
      where: { userId: req.user.id } 
    });

    if (!doctor) {
      return res.status(404).json({ message: "لم يتم العثور على ملف طبيب لهذا المستخدم" });
    }

    const doctorId = doctor.id; // الآن لدينا المعرف الصحيح (رقم 5 في مثالك)

    // 3. جلب المواعيد وترتيبها
    const bookings = await Booking.findAll({
      where: { doctorId },
      include: [{ model: User, attributes: ["id", "fullName"] }],
      order: [
        ['bookingDate', 'DESC'], // الترتيب من الأحدث للأقدم
        ['bookingTime', 'DESC']
      ],
    });

    res.json(bookings);
  } catch (error) {
    console.error("Error in getDoctorBookingsSorted:", error);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
};


/**
 * 🔄 Update booking status
 * Doctor confirms or cancels
 */export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Confirmed", "Cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findByPk(id, {
      include: [{ model: Doctor }],
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // ✅ فقط الطبيب لي عندو نفس userId يقدر يبدل الحالة
    if (
      req.user.role !== "doctor" ||
      booking.Doctor.userId !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    booking.status = status;
    await booking.save();

    res.json({
      message: "Booking status updated successfully",
      booking,
    });
  } catch (error) {
    console.error("UPDATE BOOKING STATUS ERROR ❌", error);
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

    // ✅ غير user لي دار booking يقدر يلغي
    if (req.user.role !== "user" || booking.userId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    booking.status = "Cancelled";
    await booking.save();

    res.json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    console.error("CANCEL BOOKING ERROR ❌", error);
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
      include: [
        {
          model: Doctor,
          attributes: ["id", "fullName", "userId"],
        },
        {
          model: User,
          attributes: ["id", "fullName", "email"],
        },
      ],
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // ✅ user لي دار booking أو doctor ديالو فقط
    const isUser = req.user.id === booking.userId;
    const isDoctor =
      req.user.role === "doctor" &&
      booking.Doctor.userId === req.user.id;

    if (!isUser && !isDoctor) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(booking);
  } catch (error) {
    console.error("GET BOOKING BY ID ERROR ❌", error);
    res.status(500).json({ message: "Server error" });
  }
};
