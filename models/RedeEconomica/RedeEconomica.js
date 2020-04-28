const Sequelize = require('sequelize')
const db = require("../../database/db.js")

module.exports = db.sequelize.define(
    'cdt_rede_economica',
    {
        idRede_economica: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descricao: {
            type: Sequelize.STRING
        },
        latitude: {
            type: Sequelize.FLOAT
        },
        longitude: {
            type: Sequelize.FLOAT
        },
        id_tipo_rede: {
            type: Sequelize.INTEGER
        }
    }, 
    { 
        freezeTableName: true,
        timestamps: false 
    }
)