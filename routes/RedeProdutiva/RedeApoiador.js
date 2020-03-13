const express = require("express")
const redeApoiador  = express.Router()
const cors = require("cors")

const RedeApoiador = require("../../models/RedeProdutiva/RedeApoiador")
redeApoiador.use(cors())

process.env.SECRET_KEY = 'secret'

// Cadastro
redeApoiador.post('/register', (req, res) => {
    RedeApoiador.create(req.body)
        .then(redeApoiador => { res.json(redeApoiador)})
        .catch(err => {res.send('error: ' + err)})
})


//Busca
redeApoiador.get('/list', (req, res) => {

    RedeApoiador.findAll().then(redeApoiador => {
        if(redeApoiador){
            res.json(redeApoiador)
        }else{
            res.send('Nada encontrado'); 
        }
    }).catch(err => {
        res.send('error: ' + err)
    }); 

});

module.exports = redeApoiador