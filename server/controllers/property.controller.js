const {Property} = require("../models");

// Create a new property
exports.create = async (req, res) => {
  try {
    const {
      mls_no,
      propertyType,
      squareFeet,
      lawyerName,
      contractDate,
      subjectRemovalDate,
      completionDate,
      possesionDate,
    } = req.body;
    
    const property = await Property.create({
      mls_no,
      propertyType,
      squareFeet,
      lawyerName,
      contractDate,
      subjectRemovalDate,
      completionDate,
      possesionDate,
    });
    
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Get all properties
exports.get = async (req, res) => {
  try {
    const properties = await Property.findAll();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a property by ID
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const property = await Property.findByPk(id);
    if (property) {
      const {
        mls_no,
        propertyType,
        squareFeet,
        lawyerName,
        contractDate,
        subjectRemovalDate,
        completionDate,
        possesionDate,
      } = req.body;
      
      await property.update({
        mls_no,
        propertyType,
        squareFeet,
        lawyerName,
        contractDate,
        subjectRemovalDate,
        completionDate,
        possesionDate,
      });
      
      res.json(property);
    } else {
      res.status(404).json({ error: 'Property not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a property by ID
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const property = await Property.findByPk(id);
    if (property) {
      await property.destroy();
      res.json({ message: 'Property deleted successfully' });
    } else {
      res.status(404).json({ error: 'Property not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
