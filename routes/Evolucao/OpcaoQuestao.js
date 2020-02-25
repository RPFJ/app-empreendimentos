const express = require("express")
const opcaoQuestao  = express.Router()
const cors = require("cors")

const OpcaoQuestao = require("../../models/Evolucao/OpcaoQuestao")
opcaoQuestao.use(cors())

process.env.SECRET_KEY = 'secret'

// Cadastro
opcaoQuestao.post('/register', (req, res) => {
    OpcaoQuestao.create(req.body)
    .then(opcaoQuestao=> { res.json(opcaoQuestao)})
    .catch(err => {res.send('error: ' + err)})
})


//Busca
opcaoQuestao.get('/list', (req, res) => {

    OpcaoQuestao.findAll().then(opcaoQuestao => {
        if(opcaoQuestao){
            res.json(opcaoQuestao)
        }else{
            res.send('Nada encontrado'); 
        }
    }).catch(err => {
        res.send('error: ' + err)
    }); 

});

module.exports = opcaoQuestao