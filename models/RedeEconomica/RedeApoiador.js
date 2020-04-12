const Sequelize = require('sequelize')
const db = require("../../database/db.js")

module.exports = db.sequelize.define(
    'rede_economica_apoiador',
    {
        id_rede_economica: {
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