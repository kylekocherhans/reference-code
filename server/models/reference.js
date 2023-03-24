const { DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

module.exports = {
    Reference: sequelize.define('reference', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        snippet: DataTypes.TEXT,
        notes: DataTypes.TEXT
    })
};