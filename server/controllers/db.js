const { Sequelize } = require('sequelize');

module.exports = new Sequelize("mern_auth", "admin", "As@998875", {
    host: "localhost",
    dialect: 'mysql',
 ssl: {
    ca: 'etc/ssl/certs/ca-certificate.pem',     // Path to the CA certificate file.
    cert: 'etc/ssl/certs/client-certificate.pem', // Path to the client certificate file.
    key: 'etc/ssl/certs/client-key.pem',         // Path to the client private key file.
    rejectUnauthorized: true              // Set to 'true' to reject unauthorized connections (recommended).
  },
      dialectOptions: {
          charset: 'utf8mb4', 
      }, 
  });;
