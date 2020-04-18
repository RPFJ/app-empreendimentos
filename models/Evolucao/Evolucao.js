const Sequelize = require('sequelize')
const db = require("../../database/db.js")

module.exports = db.sequelize.define(
    'rel_evolucao',
    {
        idEvolucao: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_geracao_renda: {
            type: Sequelize.FLOAT
        },
        n_homens: {
            type: Sequelize.INTEGER
        },
        n_mulheres: {
            type: Sequelize.INTEGER
        },
        computador:{
            type: Sequelize.BOOLEAN
        },
        internet: {
            type: Sequelize.BOOLEAN
        },
        id_empreendimento: {
            type: Sequelize.INTEGER
        },   
        id_rede_economica: {
            type: Sequelize.INTEGER
        }        
    }, 
    { 
        freezeTableName: true,
        timestamps: false 
    }
)