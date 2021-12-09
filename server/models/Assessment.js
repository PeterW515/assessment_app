// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

class Assessment extends Model { }

Assessment.init(
    {
        clientId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'client',
                key: 'id',
            },
        },
        assessmentDate: {
            type: DataTypes.DATEONLY,
        },
        squat: DataTypes.INTEGER,
        deadlift: DataTypes.INTEGER,
        bench: DataTypes.INTEGER,
        pullUps: DataTypes.INTEGER,
        sitUps: DataTypes.INTEGER,
        cmj: DataTypes.INTEGER,
        recordedBy: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        notes: DataTypes.TEXT
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'assessment',
    }
);

module.exports = Assessment;
