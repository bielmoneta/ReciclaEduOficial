const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = sequelize.define('User', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('student','admin','teacher'), defaultValue: 'student' },
  points: { type: DataTypes.INTEGER, defaultValue: 0 }
});
module.exports = User;