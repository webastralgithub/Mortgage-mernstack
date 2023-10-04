const { Todo, Contact,User } = require('../models');

// Create a new Todo
const createTodo = async (req, res) => {
  try {
    const { userId } = req.user;
    const todoData = { ...req.body, createdBy: userId };

    const newTodo = await Todo.create(todoData);

    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error creating Todo:', error);
    res.status(500).json({ error: 'Failed to create Todo' });
  }
};

// Get all Todos
const getAllTodos = async (req, res) => {
  const { userId } = req.user;
  // if (req.user.roleId == 4) {
  //   try {
  //     const todos = await Todo.findAll({
  //       where: {
  //         realtorId: req.user.userId,
  //       },
  //       include: [
  //         {
  //           model: Contact,
  //           as: 'client',
  //           attributes: ['firstname'],
  //         },
  //         {
  //           model: User,
  //           as: 'realtor',
  //           attributes: ['name'],
  //         },
  //         {
  //           model:Contact,
  //           as: 'familyMember',
  //           attributes: ['firstname'],
  //         }
  //       ]
  //     }
  
  //     );
  //     res.status(200).json(todos);
  //     return
  //   } catch (error) {
  //     console.error('Error fetching Todos:', error);
  //     res.status(500).json({ error: 'Failed to fetch Todos' });
  //   }

  // }


  try {
    if(userId==1){
    const todos = await Todo.findAll({
      where: {
        isRead: false, // Add the where condition to filter isRead = false
      },
      include: [
        {
          model: Contact,
          as: 'client',
          attributes: ['firstname'],
        },
        {
          model: User,
          as: 'realtor',
          attributes: ['name'],
        },
        {
          model:Contact,
          as: 'familyMember',
          attributes: ['firstname'],
        }
      ],
      order: [['createdAt', 'DESC']]
    }

    );
    res.status(200).json(todos);
  }
  else {
    const todos = await Todo.findAll({
      where: {
        isRead: false,
        createdBy: userId, // Add the where condition to filter isRead = false
      },

      include: [
        {
          model: Contact,
          as: 'client',
          attributes: ['firstname'],
        },
        {
          model: User,
          as: 'realtor',
          attributes: ['name'],
        },
        {
          model:Contact,
          as: 'familyMember',
          attributes: ['firstname'],
        }
      ],
      order: [['createdAt', 'DESC']]
    }

    );
    res.status(200).json(todos);
  }
  } catch (error) {
    console.error('Error fetching Todos:', error);
    res.status(500).json({ error: 'Failed to fetch Todos' });
  }
};

// Get a single Todo by ID
const getTodoById = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    console.error('Error fetching Todo:', error);
    res.status(500).json({ error: 'Failed to fetch Todo' });
  }
};

// Update a Todo by ID
const updateTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount] = await Todo.update(req.body, {
      where: { id },
    });
    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo updated successfully' });
  } catch (error) {
    console.error('Error updating Todo:', error);
    res.status(500).json({ error: 'Failed to update Todo' });
  }
};

// Delete a Todo by ID
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await Todo.destroy({
      where: { id },
    });
    if (deletedRowCount === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting Todo:', error);
    res.status(500).json({ error: 'Failed to delete Todo' });
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
