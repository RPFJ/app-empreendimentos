const Sequelize = require('sequelize')
const db = require("../../database/db.js")

module.exports = db.sequelize.define(
    'cdt_resposta',
    {
        idReposta: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        desc_respsota: {
            type: Sequelize.STRING
        },
        id_questao: {
            type: Sequelize.INTEGER
        },
        id_evolucao: {
            type: Sequelize.INTEGER
        }        
    }, 
    { 
        freezeTableName: true,
        timestamps: false 
    }
)