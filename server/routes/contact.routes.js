const express = require("express");
const router = express.Router();
const ContactController = require("../controllers/contact.controller");
const { verifyToken } = require("../middleware/middleware"); // Import the verifyToken middleware

// Apply the verifyToken middleware to restrict access
router.post("/create",  ContactController.createContact);
router.get("/get", verifyToken, ContactController.getAllContacts);
router.get("/get/:id", verifyToken, ContactController.getContactById);
router.put("/update/:id", verifyToken, ContactController.updateContact);
router.delete("/delete/:id", verifyToken, ContactController.deleteContact);

// Add route for getting children of a parent contact
router.get("/get-children/:parentId", verifyToken, ContactController.getChildrenByParentId);

module.exports = router;
