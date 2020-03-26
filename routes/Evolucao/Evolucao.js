const express = require("express")
const evolucao  = express.Router()
const cors = require("cors")

const Evolucao = require("../../models/Evolucao/Evolucao")
evolucao.use(cors())

process.env.SECRET_KEY = 'secret'

// Cadastro
evolucao.post('/register', (req, res) => {
    Evolucao.create(req.body)
    .then(evolucao=> { 
        res.json(evolucao.dataValues); 
    })
    .catch(err => {res.send('error: ' + err)})
})

//Busca
evolucao.get('/list', (req, res) => {

    Evolucao.findAll().then(evolucao => {
        if(evolucao){
            res.json(evolucao)
        }else{
            res.send('Nada encontrado'); 
        }
    }).catch(err => {
        res.send('error: ' + err)
    }); 

});

module.exports = evolucao; 