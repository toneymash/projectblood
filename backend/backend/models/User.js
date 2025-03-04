import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const User = sequelize.define(
  "User",
  {
    UserID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
    },
    Phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    Password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Role: {
      type: DataTypes.ENUM("admin", "donor"),
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

export default User;
