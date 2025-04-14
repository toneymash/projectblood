// models/HospitalRequest.js
import { DataTypes } from 'sequelize'; 
import { sequelize } from '../config/db.js';

const HospitalRequest = sequelize.define('HospitalRequest', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    hospitalName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bloodType: {          // Matches DTO bloodType field
        type: DataTypes.STRING(5),
        allowNull: false,
    },
    quantity: {           // Matches DTO quantity field
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    contactPerson: {      // Matches mapped field from DTO
        type: DataTypes.STRING,
        allowNull: false,
    },
    urgency: {            // Matches DTO urgency field
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'fulfilled'),
        defaultValue: 'pending'
    },
    documentPath: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    latitude: {
        type: DataTypes.DECIMAL(10,8),
        allowNull: true,
    },
    longitude: {
        type: DataTypes.DECIMAL(11,8),
        allowNull: true,
    }
}, {
    tableName: 'blood_requests',  // Make sure this matches your actual table name
    timestamps: true
});

export default HospitalRequest;