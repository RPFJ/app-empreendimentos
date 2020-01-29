const Sequelize = require('sequelize')
const db = require("../../database/db.js")

module.exports = db.sequelize.define(
    'cdt_contato',
    {
        idContato: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: Sequelize.STRING
        },
        id_tipo_contato:{
            type: Sequelize.INTEGER, 
        },
        desc_contato: {
            type: Sequelize.STRING
        },
        id_cooperativa: {
            type: Sequelize.INTEGER,
        }
    }, 
    { 
        freezeTableName: true,
        timestamps: false 
    }
)