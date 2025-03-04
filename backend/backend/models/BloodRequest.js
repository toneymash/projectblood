import { Sequelize } from 'sequelize';
import { sequelize } from '../config/db.js';

const BloodRequest = sequelize.define('BloodRequest', {
  HospitalID: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  BloodType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  UnitsRequired: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  RequestDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  Status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "Pending"
  }
}, {
  timestamps: false
});

export default BloodRequest;
