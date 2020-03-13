const Sequelize = require('sequelize')
const db = require("../../database/db.js")

module.exports = db.sequelize.define(
    'rede_produtiva_apoiador',
    {
        id_rede_produtiva: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        id_apoiador: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }      
    }, 
    { 
        freezeTableName: true,
        timestamps: false 
    }
)