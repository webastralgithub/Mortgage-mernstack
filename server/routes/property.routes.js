// server/routes/admin.routes.js
const express = require("express");
const router = express.Router();
const PropertyController = require("../controllers/property.controller");
const { verifyToken } = require("../middleware/middleware");


router.post("/create", verifyToken, PropertyController.create);

router.get("/", PropertyController.get);
router.put('/update/:id',verifyToken, PropertyController.update)
router.get('/contact/get/:id',verifyToken, PropertyController.getContactPropertyByid)
router.delete('/delete/:id',verifyToken,PropertyController.delete)
router.get('/contact/:id',verifyToken,PropertyController.getContactProperty)
module.exports = router;
