



import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.js";
import Doctor from "./doctor.js";

const Booking = sequelize.define(
  "Booking",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },

    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Doctor,
        key: "id",
      },
    },

    bookingDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    bookingTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("Pending", "Confirmed", "Cancelled"),
      defaultValue: "Pending",
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "bookings",
  }
);

User.hasMany(Booking, { foreignKey: "userId" });
Booking.belongsTo(User, { foreignKey: "userId" });

Doctor.hasMany(Booking, { foreignKey: "doctorId" });
Booking.belongsTo(Doctor, { foreignKey: "doctorId" });

export default Booking;
