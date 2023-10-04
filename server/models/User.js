const { DataTypes } = require("sequelize");
const db = require('../config/db');

const User = db.define("user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name:{
    type: DataTypes.STRING,
    allowNull: true,
   
  },
  profileImg:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
   
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
   
  },
  isActivate:{
    type:DataTypes.BOOLEAN,
    defaultValue:true
  }
});

module.exports = User;
