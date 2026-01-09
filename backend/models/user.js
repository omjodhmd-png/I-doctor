import { DataTypes } from "sequelize";
import  sequelize  from "../config/db.js"; // import instance ديال sequelize

const User = sequelize.define("user", {
  
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
  role: {
    type: DataTypes.ENUM("user", "doctor"),
    defaultValue: "user",
  },
}, {
  tableName: "user",
  timestamps: true,
});

export default User;
