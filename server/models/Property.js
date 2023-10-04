const { DataTypes } = require("sequelize");
const db = require('../config/db');

const Property = db.define("property", {
  
  mls_no: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  propertyType:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  squareFeet:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  address:{
    type: DataTypes.STRING,
    allowNull: true,
  },

  contractDate:{
    type: DataTypes.DATE,
    allowNull: true,
  },
  subjectRemovalDate:{
    type: DataTypes.DATE,
    allowNull: true,
  },
  completionDate:{
    type: DataTypes.DATE,
    allowNull: true,
  
  },
  description: {
    type: DataTypes.STRING(3000),
     allowNull: true,
  },
  notes: {
    type: DataTypes.STRING(3000),
  allowNull: true,
  },
  lawyerName:{
    type: DataTypes.STRING(3000),
    allowNull: true,
  },
  possesionDate:{
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true, // Set the default value to 1
  },
  price: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // Set the default value to 1
  },
  bedrooms:{
    type: DataTypes.INTEGER,
    defaultValue: 0, // Set the default value to 1
  },
   bathrooms:{
    type: DataTypes.INTEGER,
    defaultValue: 0, // Set the default value to 1
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Define it as an array of strings
    allowNull: true,
  },
  mainImage: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
 contactId:{
  type: DataTypes.INTEGER,
    defaultValue: 0,
 }
});

module.exports = Property;
