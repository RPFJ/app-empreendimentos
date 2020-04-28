const Sequelize = require('sequelize')
const db = require("../../database/db.js")

module.exports = db.sequelize.define(
    'cdt_empreendimento',
    {
        idEmpreendimento: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descricao: {
            type: Sequelize.STRING
        },
        endereco: {
            type: Sequelize.STRING
        },
        cidade: {
            type: Sequelize.STRING
        },
        latitude: {
            type: Sequelize.FLOAT
        },
        longitude: {
            type: Sequelize.FLOAT
        },
        email: {
            type: Sequelize.STRING
        },
        sigla: {
            type: Sequelize.STRING
        },
        ano_inicio: {
            type: Sequelize.INTEGER
        },
        id_area_atuacao: {
            type: Sequelize.INTEGER
        },
        id_localizacao: {
            type: Sequelize.INTEGER
        },
        id_tipo_organizacao: {
            type: Sequelize.INTEGER
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
)