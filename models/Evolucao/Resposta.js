const Sequelize = require('sequelize')
const db = require("../../database/db.js")

module.exports = db.sequelize.define(
    'cdt_resposta',
    {
        idResposta: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_opcao_questao: {
            type: Sequelize.INTEGER
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