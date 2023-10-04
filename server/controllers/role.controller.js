const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {Role, Permission} = require("../models");
const db = require('../config/db')

// User registration
exports.create = async (req, res) => {
  try {
    const { name } = req.body;

    // Create a new user with the specified role
    const user = await Role.create({ name});

    res.json({ message: 'Role created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Role creation  failed' });
  }
};
exports.get = async ( req,res) => {
    try {
    
  
      // Create a new user with the specified role
      const role =await Role.findAll({
        include: Permission, // This will fetch associated permissions
      });
  
      res.json({roles:role });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  };
  exports.addPermission = async (req, res) => {
    try {
      // Extract data from the request body
      const { roleId, resource_name,permission,value} = req.body;
  
      // Validate the incoming data (e.g., check if required fields are present)
  
      // Create a new permission record in the database
      const existingPermission = await Permission.findOne({
        where: {
          roleId: roleId,
          resource_name: resource_name,
        },
      });
  
      if (existingPermission) {
        // If it exists, update the permission based on the provided "permission" field
        existingPermission[permission] = value;
        await existingPermission.save();
        res.status(200).json({ message: 'Permission updated successfully' });
      } else {
        // If it doesn't exist, create a new permission with the provided values
        const newPermission = await Permission.create({
          roleId: roleId,
          resource_name: resource_name,
          [permission]: value,
        });
        res.status(201).json({ message: 'Permission created successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  };
  exports.update = async (req, res) => {
    const id = req.params.id;
    try {
      const property = await Role.findByPk(id);
      if (property) {
        const {
          name
        } = req.body;
        
        await property.update({
          name
        });
        
        res.json(property);
      } else {
        res.status(404).json({ error: 'Role not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };



