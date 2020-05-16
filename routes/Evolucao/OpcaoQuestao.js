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
    console.log('req', req);
    const opcaoQuestaoDados = {
        id_questao: req.body.idQuestao
    }
  

    OpcaoQuestao.findAll({
        where: {
            id_questao: req.body.headers
        }
    }).then(opcaoQuestao => {
        if(opcaoQuestao){
            res.json(opcaoQuestao)
        }else{
            res.send('Nada encontrado'); 
        }
    }).catch(err => {
        res.send('error: ' + err)
    }); 

});


//Busca personalizada
opcaoQuestao.post('/listW', (req, res) => {
    const opcaoQuestaoDados = {
        id_questao: req.body.id_questao
    }
    OpcaoQuestao.findAll({
        where: {
            id_questao: opcaoQuestaoDados.id_questao
        }
    }).then(opcaoQuestao => {
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