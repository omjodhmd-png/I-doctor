import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.js"; 

const Doctor = sequelize.define(
  "Doctor",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, 
      references: {
        model: "user",
        key: "id",
      },
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
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    languages: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    workTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    availabilityDays: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    consultationDuration: {
      type: DataTypes.INTEGER,
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


User.hasOne(Doctor, { foreignKey: "userId", onDelete: "CASCADE" });
Doctor.belongsTo(User, { foreignKey: "userId" });

export default Doctor;