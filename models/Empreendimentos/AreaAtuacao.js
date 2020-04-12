const Sequelize = require('sequelize')
const db = require("../../database/db.js")

module.exports = db.sequelize.define(
    'cdt_area_atuacao',
    {
        idAreaAtuacao: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        desc_area_atuacao: {
            type: Sequelize.STRING
        }
    }, 
    { 
        freezeTableName: true,
        timestamps: false 
    }
)