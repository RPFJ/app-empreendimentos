const Sequelize = require('sequelize')
const db = require("../../database/db.js")

module.exports = db.sequelize.define(
    'cdt_tp_organizacao',
    {
        idTipoOrganizacao: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome_tipo: {
            type: Sequelize.STRING
        }
    }, 
    { 
        freezeTableName: true,
        timestamps: false 
    }
)