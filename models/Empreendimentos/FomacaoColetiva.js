const Sequelize = require('sequelize')
const db = require("../../database/db.js")

module.exports = db.sequelize.define(
    'cdt_formacao_coletiva',
    {
        idFormacao_coletiva: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        desc_formacao_coletiva: {
            type: Sequelize.STRING
        }
    }, 
    { 
        freezeTableName: true,
        timestamps: false 
    }
)