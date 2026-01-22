import Booking from "../models/booking.js";
import Doctor from "../models/doctor.js";
import User from "../models/user.js";
import { Op } from "sequelize";


export const createBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const { doctorId, bookingDate, bookingTime, notes } = req.body;


    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

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


export const getDoctorBookings = async (req, res) => {
  try {
    const doctorId = req.user.id; 
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

// export const getDoctorBookingsSorted = async (req, res) => {
//   try {
//     if (req.user.role !== "doctor") {
//       return res.status(403).json({ message: "not " });
//     }

//     const doctor = await Doctor.findOne({ 
//       where: { userId: req.user.id } 
//     });

//     if (!doctor) {
//       return res.status(404).json({ message: "doctor not found"});
//     }

//     const doctorId = doctor.id; 

    
//     const bookings = await Booking.findAll({
//       where: { doctorId },
//       include: [{ model: User, attributes: ["id", "fullName"] }],
//       order: [
//         ['bookingDate', 'DESC'],
//         ['bookingTime', 'DESC']
//       ],
//     });

//     res.json(bookings);
//   } catch (error) {
//     console.error("Error in getDoctorBookingsSorted:", error);
//     res.status(500).json({ message: "server error" });
//   }
// };


export const updateBookingStatus = async (req, res) => {
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
    console.error("UPDATE BOOKING STATUS ERROR ", error);
    res.status(500).json({ message: "Server error" });
  }
};




export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

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
    console.error("CANCEL BOOKING ERROR ", error);
    res.status(500).json({ message: "Server error" });
  }
};


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

    const isUser = req.user.id === booking.userId;
    const isDoctor =
      req.user.role === "doctor" &&
      booking.Doctor.userId === req.user.id;

    if (!isUser && !isDoctor) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(booking);
  } catch (error) {
    console.error("GET BOOKING BY ID ERROR ", error);
    res.status(500).json({ message: "Server error" });
  }
};
