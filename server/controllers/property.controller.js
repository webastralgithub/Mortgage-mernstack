const {Property, User} = require("../models");

// Create a new property
exports.create = async (req, res) => {
  try {
    const {
      mls_no,
      propertyType,
      squareFeet,
      lawyerId,
      price,
      contractDate,
      subjectRemovalDate,
      completionDate,
      address,
      realtorId,
      possesionDate,
      status
    } = req.body;
    
    const property = await Property.create({
      mls_no,
      propertyType,
      squareFeet,
      realtorId,
      price,
      address,
      lawyerId,
      contractDate,
      subjectRemovalDate,
      completionDate,
      possesionDate,
      status
    });
    
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Get all properties
exports.get = async (req, res) => {
  try {
    const properties = await Property.findAll({include: [{ model: User, as: 'realtor',attributes: ['name'] },{ model: User, as: 'lawyer',attributes: ['name'] }]});
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
        price,
        lawyerName,
        address,
        contractDate,
        subjectRemovalDate,
        completionDate,
        possesionDate,
        status,
      } = req.body;
      
      await property.update({
        mls_no,
        propertyType,
        squareFeet,
        lawyerName,
        price,
        contractDate,
        subjectRemovalDate,
        completionDate,
        possesionDate,
        status,
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
