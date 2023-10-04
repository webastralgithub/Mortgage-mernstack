const { DataTypes } = require("sequelize");
const db = require('../config/db');

const Permission = db.define('permission', {
    resource_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    can_create: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    can_read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    can_update: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    can_delete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
  
  module.exports = Permission;
