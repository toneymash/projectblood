import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Donations = sequelize.define('donations', {
    donation_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    donor_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'donors',
            key: 'donor_id',
        },
    },
    request_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'requests',
            key: 'request_id',
        },
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    units_donated: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName:"donations"
});


export { Donations };
