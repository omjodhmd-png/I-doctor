import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Doctor = sequelize.define(
  "Doctor",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    speciality: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    clinicName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    experience: {
      type: DataTypes.INTEGER, // سنوات الخبرة
      allowNull: true,
    },

    languages: {
      type: DataTypes.STRING, // مثال: "Arabic, French, English"
      allowNull: true,
    },

    workTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    availabilityDays: {
      type: DataTypes.STRING, // مثال: "Mon - Fri"
      allowNull: true,
    },

    consultationDuration: {
      type: DataTypes.INTEGER, // بالدقائق
      allowNull: true,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    certifications: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    tableName: "doctors",
  }
);

export default Doctor;
