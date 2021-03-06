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
        desc_contato: {
            type: Sequelize.STRING
        },
        id_tipo_contato:{
            type: Sequelize.INTEGER, 
        },
        id_empreendimento: {
            type: Sequelize.INTEGER,
        }
    }, 
    { 
        freezeTableName: true,
        timestamps: false 
    }
)