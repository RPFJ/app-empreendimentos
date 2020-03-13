const express = require("express")
const apoiador  = express.Router()
const cors = require("cors")

const Apoiador = require("../../models/RedeProdutiva/Apoiador")
apoiador.use(cors())

process.env.SECRET_KEY = 'secret'

// Cadastro
apoiador.post('/register', (req, res) => {
    Apoiador.create(req.body)
        .then(apoiador => { res.json(apoiador)})
        .catch(err => {res.send('error: ' + err)})
})


//Busca
apoiador.get('/list', (req, res) => {

    Apoiador.findAll().then(apoiador => {
        if(apoiador){
            res.json(apoiador)
        }else{
            res.send('Nada encontrado'); 
        }
    }).catch(err => {
        res.send('error: ' + err)
    }); 

});

module.exports = apoiador