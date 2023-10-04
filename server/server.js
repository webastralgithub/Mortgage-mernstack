// server/server.js
const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path');
app.use(cors());
const multer=require("multer")
const sequelize = require('./config/db');
app.use(express.json());

// const db = new Sequelize("mern_auth", "root", "redhat", {
//     host: "localhost",
//     dialect: 'mysql',
//       dialectOptions: {
//           charset: 'utf8mb4',
//       }, // Use the appropriate dialect for your database
//   });
  
//   // Test the database connection
//   db.authenticate()
//     .then(() => {
//       console.log("Database connection successful");
//     })
//     .catch((error) => {
//       console.error("Database connection failed:", error);
//     });

// Import and use your routes here
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const roleRoutes=require("./routes/role.routes");
const propertyRoutes=require("./routes/property.routes");
const contactRoutes=require("./routes/contact.routes");
const todoRoutes=require("./routes/todo.routes");
const { verifyToken } = require("./middleware/middleware");
sequelize.authenticate().then(() => {
  sequelize.sync({ force: false }).then(() => {
    console.log('Drop and re-sync db...');
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Upload directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname); // Get the file extension
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});



const upload = multer({ storage });


app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/todo", todoRoutes);
app.use('/uploads', express.static('uploads'));






const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/api/upload-images', verifyToken, upload.array('images', 10), (req, res) => {
  // Handle uploaded images here (e.g., save file paths to a database)
  const imageUrls = req.files.map((file) => {
    // Construct the URL for each uploaded image based on your server setup
    return `http://112.196.64.119:5000/${file.path}`;
  });

  // Respond with the image URLs
  res.status(200).json({ message: 'Images uploaded successfully', imageUrls });
});
