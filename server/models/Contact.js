const { DataTypes } = require("sequelize");
const db = require('../config/db');

const Contact = db.define("contact", {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  address1:{
    type: DataTypes.STRING,
    allowNull: false,
  },



source:{
    type: DataTypes.STRING,
    defaultValue:"Website",
    allowNull: true,
},
listingOptions:{
  type: DataTypes.STRING,
    defaultValue:"",
    allowNull: true,
},
areaOptions:{
  type: DataTypes.STRING,
    defaultValue:"",
    allowNull: true,
},
budget:{
  type: DataTypes.STRING,
    defaultValue:"",
    allowNull: true,
},
trait:{
  type: DataTypes.STRING,
    defaultValue:"",
    allowNull: true,
},
listingOptions:{
  type: DataTypes.STRING,
    defaultValue:"",
    allowNull: true,
},

  phone: {
    type: DataTypes.STRING,
    allowNull: true,
   
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue:"",
   
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue:1,
  },
  isLead:{
    type: DataTypes.BOOLEAN,
    defaultValue:0
  }
  
});

module.exports = Contact;
