const express = require("express")
const resposta  = express.Router()
const cors = require("cors")

const Resposta = require("../../models/Evolucao/Resposta")
resposta.use(cors())

process.env.SECRET_KEY = 'secret'

// Cadastro
resposta.post('/register', (req, res) => {
    Resposta.create(req.body)
    .then(resposta=> { 
        res.json(resposta.dataValues); 
    })
    .catch(err => {res.send('error: ' + err)})
})

//Busca
resposta.get('/list', (req, res) => {

    Resposta.findAll().then(resposta => {
        if(resposta){
            res.json(resposta)
        }else{
            res.send('Nada encontrado'); 
        }
    }).catch(err => {
        res.send('error: ' + err)
    }); 

});

module.exports = resposta; 