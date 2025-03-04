import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Donors = sequelize.define('donors', {
    donor_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users', // Assuming a Users table exists
            key: 'user_id',
        },
    },
    blood_type: {
        type: DataTypes.ENUM('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'),
        allowNull: true,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    last_donation_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    }
}, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
});


export { Donors };
