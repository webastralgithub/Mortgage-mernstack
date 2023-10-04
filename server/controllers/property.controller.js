const { Op } = require("sequelize");
const {Property, User} = require("../models");

// Create a new property
exports.create = async (req, res) => {
  // if(req.user.roleId !== 1 ||req.user.roleId !== 4) 
  // {
  //   return res.status(403).json({ error: 'Permission denied' });
  // }

  try {
    const {
      mls_no,
      propertyType,
      squareFeet,
      lawyerId,
      price,
      description,
      notes,
      contractDate,
      subjectRemovalDate,
      contactId,
      completionDate,
      address,
      realtorId,
      possesionDate,
      status,
      images,
      mainImage,
      bedrooms,
      bathrooms,
      agentId,
      lawyerName,
    } = req.body;
     if(req.user.roleId == 4) {
      realtorId=req.user.userId
     }
    const property = await Property.create({
      mls_no,
      propertyType,
      squareFeet,
      realtorId,
      contactId,
      description,
      notes,
      price,
      address,
      lawyerId,
      contractDate,
      subjectRemovalDate,
      completionDate,
      possesionDate,
      status,
      images,
      mainImage,
      bedrooms,
      bathrooms,
      agentId,
      lawyerName,
    });
    
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Get all properties
exports.get = async (req, res) => {
  console.log(req?.user,"Fdfafdafddfdffd")
  console.log(req?.user?.userId, "Dgdgdgggd");

  if (req?.user?.roleId == 4) {
    console.log("Dgdgdgggdinside");
    try {
      const properties = await Property.findAll({
        where: {
          [Op.and]: [
            {
              contactId: 0,
            },
            {
              realtorId: req.user.userId,
            },
          ],
        },
        include: [
          {
            model: User,
            as: 'realtor',
      
          },
          {
            model: User,
            as: 'lawyer',
         
          },
          {
            model: User,
            as: 'activeAgent',
          },
        ],
        order: [['createdAt', 'DESC']]
      });

      res.json(properties);
      return;
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  try {
    const properties = await Property.findAll({
      where: {
        contactId: 0,
      },
      include: [
        {
          model: User,
          as: 'realtor',
          attributes: ['name','id'],
        },
        {
          model: User,
          as: 'lawyer',
          attributes: ['name','id'],
        },
        {
          model: User,
          as: 'activeAgent',
          attributes: ['name','id'],
        },
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: error });
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
        realtorId,
        lawyerId,
        description,
        notes,
        address,
        contractDate,
        subjectRemovalDate,
        completionDate,
        possesionDate,
        status,
        images,
        mainImage,
        bedrooms,
        bathrooms,
        agentId,
        lawyerName,

      } = req.body;
      
      await property.update({
        mls_no,
        propertyType,
        squareFeet,
        lawyerId,
        address,
        realtorId,
        description,
        
        notes,
        price,
        contractDate,
        subjectRemovalDate,
        completionDate,
        possesionDate,
        status,  
        images,
        mainImage,
        bedrooms,
        bathrooms,
        agentId,
        lawyerName,
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

exports.getContactProperty = async (req, res) => {
  const id = req.params.id;
  try {
    const properties = await Property.findAll({
      where: {
        contactId: id,
      },
      include: [
        {
          model: User,
          as: 'realtor',
          attributes: ['name'],
        },
        {
          model: User,
          as: 'lawyer',
          attributes: ['name'],
        },
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.json(properties);
   
    
    
    
    
    
  } catch (error) {
    res.status(500).json({ error:error });
  }
};

exports.getContactPropertyByid = async (req, res) => {
  const id = req.params.id;
  try {
    const properties = await Property.findAll({
      where: {
        id: id,
      },
      include: [
        {
          model: User,
          as: 'realtor',
          attributes: ['name','id'],
        },
        {
          model: User,
          as: 'lawyer',
          attributes: ['name','id'],
        },
        {
          model: User,
          as: 'activeAgent',
          attributes: ['name','id'],
        },
      ],

    });
    
    res.json(properties);
   
    
    
    
    
    
  } catch (error) {
    res.status(500).json({ error:error });
  }
};

