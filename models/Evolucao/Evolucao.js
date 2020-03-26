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
        geracao_renda: {
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
        id_cooperativa: {
            type: Sequelize.INTEGER
        },   
        id_rede_produtiva: {
            type: Sequelize.INTEGER
        }        
    }, 
    { 
        freezeTableName: true,
        timestamps: false 
    }
)