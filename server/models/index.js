
const Role = require('./Role');
const User = require('./User');
const Property=require("./Property")
const Permission=require("./Permission")
const Contact=require("./Contact");
const Todo = require('./Todo');


Role.hasOne(User, { onDelete: 'cascade' });
User.belongsTo(Role, { as: 'roles', foreignKey: 'roleId' });
User.hasOne(Property, { onDelete: 'cascade' });
Property.belongsTo(User, { as: 'realtor', foreignKey: 'realtorId' });
Property.belongsTo(User, { as: 'activeAgent', foreignKey: 'agentId' });
Property.belongsTo(User, { as: 'lawyer', foreignKey: 'lawyerId' });
Permission.belongsTo(Role, { as: 'roles', foreignKey: 'roleId' });
Contact.belongsTo(User, { as: 'realtor', foreignKey: 'realtorId' })
Contact.belongsTo(Property, { as: 'property', foreignKey: 'propertyId' })
Contact.belongsTo(Contact, { as: 'parent', foreignKey: 'parentId' });
Contact.hasMany(Contact, { as: 'children', foreignKey: 'parentId' });
Todo.belongsTo(Contact, { as: 'client', foreignKey: 'clientId' });
Todo.belongsTo(Contact, { as: 'familyMember', foreignKey: 'ContactID' });
Todo.belongsTo(User, { as: 'realtor', foreignKey: 'realtorId' });
Contact.belongsTo(User, { as: 'activeAgent', foreignKey: 'agentId' });


Role.hasMany(Permission, { onDelete: 'cascade' });
module.exports = {
	User,
	Role,
	Property,
	Permission,
	Contact,
	Todo,
};
