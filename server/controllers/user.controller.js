const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User, Role, Permission} = require("../models");
const db = require('../config/db')

// User registration
exports.register = async (req, res) => {
  try {
    const { username, password, roleId,email,phone } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password before saving it
    const saltRounds = 10; // You can adjust this value for security
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the specified role
    const user = await User.create({ username, password: hashedPassword, roleId,email,phone });

    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    

    // Find the user by username
    const user = await User.findOne({
      where: { username },
      include: [
        {
          model: Role, as: 'roles',
          include: Permission,
        },
      ],
    });
    if(!user.isActivate){
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user exists
    if (!user) {
      return res.status(500).json({ error: 'User is deactivated' });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate and send a JWT token upon successful login
    const token = jwt.sign({ userId: user.id,roleId:user.roleId , permission: user}, 'your-secret-key', {
      expiresIn: '6h', // Token expires in 1 hour (adjust as needed)
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
};

// Create user (admin-only)
exports.createUser = async (req, res) => {
  try {
    const { username, password, roleId, email, phone,name, profileImg } = req.body;

    // You may want to add role validation logic here to ensure only admin can create users

 
    // Hash the password before saving it
    const saltRounds = 10; // You can adjust this value for security
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the specified role
    const user = await User.create({ username, password: hashedPassword, roleId, email, phone,name});

    res.json({ message: 'User created successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'User creation failed' });
  }
};
// Get all users (admin-only)
exports.getAllUsers = async (req, res) => {
  try {
    // Check if the user making the request has the "admin" role

    // if (req.user.roleId !== 1) {
    //   return res.status(403).json({ error: 'Permission denied' });
    // }

    // Fetch all users from the database
    const users = await User.findAll({include: [{ model: Role, as: 'roles',attributes: ['name'] }],order: [['createdAt', 'DESC']]});
    // Return the list of users (excluding their passwords)
    // const userArray = users.map((user) => {
    //   const { id, username, role,email,phone } = user;
    //   return { id, username, role,email,phone };
    // });

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching users' });
  }
};
exports.getUser = async (req, res) => {
  try {
    const {userId}=req.user
    // Check if the user making the request has the "admin" role

    // if (req.user.roleId !== 1) {
    //   return res.status(403).json({ error: 'Permission denied' });
    // }

    // Fetch all users from the database
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Role,
          as: 'roles',
          attributes: ['name'],
        },
      ],
    });

    // Return the list of users (excluding their passwords)
    // const userArray = users.map((user) => {
    //   const { id, username, role,email,phone } = user;
    //   return { id, username, role,email,phone };
    // });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching user' });
  }
};
exports.changePassword = async (req, res) => {

  // if(req.user.roleId != 1 ) 
  // {
  //   return res.status(403).json({ error: 'Permission denied' });
  // }
  const { userId } = req.params;
  const { newPassword } = req.body;

  try {
    // Generate a hash of the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    const user = await User.findByPk(userId); // Replace with your user model
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Failed to change password.' });
  }
   
};


exports.changeRealtor = async (req, res) => {
  const { userId } = req.params;
  const { name, email, phone, profileImg,isActivate } = req.body;

  try {
    const user = await User.findByPk(userId); // Replace with your user model

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update the user's details
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.profileImg=profileImg;
    user.isActivate=isActivate

    await user.save();

    res.status(200).json({ message: 'User details updated successfully.' });
  } catch (error) {
    console.error('Error changing user details:', error);
    res.status(500).json({ message: 'Failed to change user details.' });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const {userId}=req.user
  

    // Fetch all users from the database
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Role,
          as: 'roles',
          attributes: ['name'],
        },
      ],
    });

    // Return the list of users (excluding their passwords)
    // const userArray = users.map((user) => {
    //   const { id, username, role,email,phone } = user;
    //   return { id, username, role,email,phone };
    // });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching user' });
  }
};
exports.getRealtor = async (req, res) => {
  try {
    const userId=req.params.id
    // Check if the user making the request has the "admin" role

    // if (req.user.roleId !== 1) {
    //   return res.status(403).json({ error: 'Permission denied' });
    // }
console.log(userId)
    // Fetch all users from the database
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Role,
          as: 'roles',
          attributes: ['name'],
        },
      ],
    });

    // Return the list of users (excluding their passwords)
    // const userArray = users.map((user) => {
    //   const { id, username, role,email,phone } = user;
    //   return { id, username, role,email,phone };
    // });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching user' });
  }
};