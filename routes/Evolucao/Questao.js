const express = require("express")
const questao  = express.Router()
const cors = require("cors")

const Questao = require("../../models/Evolucao/Questao")
questao.use(cors())

process.env.SECRET_KEY = 'secret'

// Cadastro

// Questao.__factory = {autoIncrementField: 'idQuestao'}
// Questao.idQuestao = ''

questao.post('/register', (req, res) => {
    console.log("chegou aqui", req); 
    Questao.create(req.body)
    .then(questao=> { 
        res.json(questao.dataValues); 
    })
        .catch(err => {res.send('error: ' + err)})
})

//Busca
questao.get('/list', (req, res) => {

    Questao.findAll().then(questao => {
        if(questao){
            res.json(questao)
        }else{
            res.send('Nada encontrado'); 
        }
    }).catch(err => {
        res.send('error: ' + err)
    }); 

});

module.exports = questao; 