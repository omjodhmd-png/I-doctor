import sequelize from "../config/db.js";
import Booking from "../models/booking.js";
import User from "../models/user.js";
import Doctor from "../models/doctor.js";

const bookingsData = [
  { userId: 1, doctorId: 1, bookingDate: "2026-01-10", bookingTime: "09:00", status: "Pending", price: 300, notes: "First consultation" },
  { userId: 2, doctorId: 2, bookingDate: "2026-01-10", bookingTime: "10:00", status: "Confirmed", price: 250, notes: "Follow-up check" },
  { userId: 3, doctorId: 3, bookingDate: "2026-01-10", bookingTime: "11:00", status: "Cancelled", price: 200, notes: "Patient rescheduled" },
];

const seedBookings = async () => {
  try {
    await sequelize.authenticate();

    // تأكد أن جدول Users و Doctors موجودين قبل Bookings
    await User.sync();
    await Doctor.sync();
    await Booking.sync({ force: true });

    await Booking.bulkCreate(bookingsData);
    console.log("✅ Bookings seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Bookings seeding error:", err);
    process.exit(1);
  }
};

seedBookings();
