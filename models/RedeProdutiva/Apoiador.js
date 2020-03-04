const Sequelize = require('sequelize')
const db = require("../../database/db.js")

module.exports = db.sequelize.define(
    'cdt_apoiador',
    {
        idApoiador: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: Sequelize.STRING
        },
        tipo_de_ajuda: {
            type: Sequelize.STRING
        }    
    }, 
    { 
        freezeTableName: true,
        timestamps: false 
    }
)