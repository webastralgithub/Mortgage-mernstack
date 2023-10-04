const { Contact, User } = require('../models');


// Create a new contact (with optional parent)
const createContact = async (req, res) => {
  try {
    const { parentId, ...contactData } = req.body;
    if(req.user){
    const {userId}=req.user
    console.log(userId,"dgdfdfdf")

    contactData.createdBy=userId
    }
    // If parentId is provided, establish the parent-child relationship
    if (parentId) {
      const parentContact = await Contact.findByPk(parentId);
      if (!parentContact) {
        return res.status(404).json({ error: 'Parent contact not found' });
      }

      contactData.parentId = parentId;
    }

    // Create the new contact
    const newContact = await Contact.create(contactData);

    res.status(201).json(newContact);
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Failed to create contact' });
  }
};

// Get all contacts
const getAllContacts = async (req, res) => {
  if (req.user.roleId == 4) {
    try {
      const contacts = await Contact.findAll({
        where: {
          realtorId: req.user.userId,
        },
        include: [
          {
            model: Contact,
            as: 'children',
            attributes: ['firstname','id'],
            required: false, // Include all contacts, even if they have no children
          },
          {
            model: User,
            as: 'realtor',
  
            required: false, // Include all contacts, even if they have no children
          },
          {
            model: User,
            as: 'activeAgent',
  
            required: false, // Include all contacts, even if they have no children
          }
        ],
        order: [['createdAt', 'DESC']]
      });
  
      // Transform the results to include an empty array for contacts with no children
      const transformedContacts = contacts.map((contact) => ({
        ...contact.toJSON(),
        children: contact.children || [],
      }));
  
      res.status(200).json(transformedContacts);
      return
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ error: 'Failed to fetch contacts' });
    }
  }

  
    try {
      const contacts = await Contact.findAll({
        include: [
          {
            model: Contact,
            as: 'children',
            attributes: ['firstname','id'],
            required: false, // Include all contacts, even if they have no children
          },
          {
            model: User,
            as: 'realtor',
  
            required: false, // Include all contacts, even if they have no children
          },
          {
            model: User,
            as: 'activeAgent',
  
            required: false, // Include all contacts, even if they have no children
          }
        ],
        order: [['createdAt', 'DESC']]
      });
  
      // Transform the results to include an empty array for contacts with no children
      const transformedContacts = contacts.map((contact) => ({
        ...contact.toJSON(),
        children: contact.children || [],
      }));
  
      res.status(200).json(transformedContacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ error: 'Failed to fetch contacts' });
    }
  };

// Get a single contact by ID
const getContactById = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findByPk(id,{
      include: [
        {
          model: Contact,
          as: 'children',
          attributes: ['firstname','id'],
          required: false, // Include all contacts, even if they have no children
        },
        {
          model: User,
          as: 'realtor',

          required: false, // Include all contacts, even if they have no children
        },
        {
          model: User,
          as: 'activeAgent',

          required: false, // Include all contacts, even if they have no children
        },
      ],
    });
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
};

// Update a contact by ID
const updateContact = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount] = await Contact.update(req.body, {
      where: { id },
    });
    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact updated successfully' });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Failed to update contact' });
  }
};

// Delete a contact by ID
const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await Contact.destroy({
      where: { id },
    });
    if (deletedRowCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
};

// Get all children of a parent contact
const getChildrenByParentId = async (req, res) => {
  const { parentId } = req.params;
  try {
    const parentContact = await Contact.findByPk(parentId, {
      include: [{ model: Contact, as: 'children' }],
     
    });
    
    if (!parentContact) {
      return res.status(404).json({ error: 'Parent contact not found' });
    }

    res.status(200).json(parentContact.children.reverse());
  } catch (error) {
    console.error('Error fetching children:', error);
    res.status(500).json({ error: 'Failed to fetch children' });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  getChildrenByParentId,
};
