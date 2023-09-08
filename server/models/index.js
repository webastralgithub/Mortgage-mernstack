
const Role = require('./Role');
const User = require('./User');
const Property=require("./Property")


Role.hasOne(User, { onDelete: 'cascade' });
User.belongsTo(Role, { as: 'roles', foreignKey: 'roleId' });
User.hasOne(Property, { onDelete: 'cascade' });
Property.belongsTo(User, { as: 'realtor', foreignKey: 'realtorId' });
Property.belongsTo(User, { as: 'lawyer', foreignKey: 'lawyerId' });
module.exports = {
	User,
	Role,
	Property
};
