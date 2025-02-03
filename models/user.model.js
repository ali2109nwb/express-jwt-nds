const {DataTypes} = require('sequelize');
const sequelize = require('./connection');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    createdAt: 'created_at',
    createdAt: 'updated_at'
});

module.exports = User;