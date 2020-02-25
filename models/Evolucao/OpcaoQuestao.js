const Sequelize = require('sequelize')
const db = require("../../database/db.js")

module.exports = db.sequelize.define(
    'cdt_opcao_questao',
    {
        idOpcao: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        desc_opcao: {
            type: Sequelize.STRING
        },
        id_questao: {
            type: Sequelize.INTEGER
        }        
    }, 
    { 
        freezeTableName: true,
        timestamps: false 
    }
)