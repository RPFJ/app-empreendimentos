const Sequelize = require('sequelize')
const db = require("../../database/db.js")

module.exports = db.sequelize.define(
    'cdt_atividade_empreendimento',
    {
        idAtividade: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        desc_atividade: {
            type: Sequelize.STRING
        }
    }, 
    { 
        freezeTableName: true,
        timestamps: false 
    }
)