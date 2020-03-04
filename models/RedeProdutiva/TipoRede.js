const Sequelize = require('sequelize')
const db = require("../../database/db.js")

module.exports = db.sequelize.define(
    'cdt_tp_rede',
    {
        idTipo_rede: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        desc_rede: {
            type: Sequelize.STRING
        }        
    }, 
    { 
        freezeTableName: true,
        timestamps: false 
    }
)