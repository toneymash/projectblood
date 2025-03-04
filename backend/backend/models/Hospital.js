import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Hospital = sequelize.define(
  "Hospital",
  {
    HospitalID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Location: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Contact: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    timestamps: false, // Disable createdAt and updatedAt fields
  }
);

export default Hospital;
