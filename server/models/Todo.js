const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming you have a Sequelize instance

const Todo = sequelize.define('Todo', {
    Followup:{
        type:DataTypes.STRING,
    allowNull: false,
  },  
    
  FollowupDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Comments: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  IsRead: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone:{
    type: DataTypes.STRING,
    allowNull: true,
  },
 

});

// Define associations

module.exports = Todo;
