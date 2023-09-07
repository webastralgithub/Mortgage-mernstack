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
  lawyerName:{
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
  possesionDate:{
    type: DataTypes.DATE,
    allowNull: true,
  }
});

module.exports = Property;
