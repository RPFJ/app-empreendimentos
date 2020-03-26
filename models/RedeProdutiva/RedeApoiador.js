const Sequelize = require('sequelize')
const db = require("../../database/db.js")

module.exports = db.sequelize.define(
    'rede_produtiva_apoiador',
    {
        id_rede_produtiva: {
            type: Sequelize.INTEGER
        },
        id_apoiador: {
            type: Sequelize.INTEGER
        }      
    }, 
    { 
        freezeTableName: true,
        timestamps: false 
    }
)
module.exports.removeAttribute('id');