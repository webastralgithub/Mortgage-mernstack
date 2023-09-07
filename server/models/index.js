
const Role = require('./Role');
const User = require('./User');
const Property=require("./Property")


Role.hasOne(User, { onDelete: 'cascade' });
User.belongsTo(Role, { as: 'roles', foreignKey: 'roleId' });

module.exports = {
	User,
	Role,
	Property
};
