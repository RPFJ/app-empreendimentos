const Sequelize = require('sequelize')
const db = require("../../database/db.js")

module.exports = db.sequelize.define(
    'cdt_geracao_renda',
    {
        idGeracao_renda: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        desc_renda: {
            type: Sequelize.STRING
        }    
    }, 
    { 
        freezeTableName: true,
        timestamps: false 
    }
)