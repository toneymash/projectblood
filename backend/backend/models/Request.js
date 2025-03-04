import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Hospital from "./Hospital.js"; // Import Hospital model for foreign key reference

const Request = sequelize.define(
  "Request",
  {
    RequestID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    HospitalID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Hospital,
        key: "HospitalID",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    BloodType: {
      type: DataTypes.ENUM("A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"),
      allowNull: true,
    },
    UnitsRequired: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    RequestDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Status: {
      type: DataTypes.ENUM("Pending", "Fulfilled"),
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

// Define the relationship between Request and Hospital
Request.belongsTo(Hospital, { foreignKey: "HospitalID" });

export default Request;
