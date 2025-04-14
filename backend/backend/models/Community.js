import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Community = sequelize.define('Community', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('discussion', 'story', 'volunteer', 'event'),
    allowNull: false
  }
}, {
  timestamps: true
});

export default Community;
