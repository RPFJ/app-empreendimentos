const express = require("express")
const redeProdutiva  = express.Router()
const cors = require("cors")

const RedeProdutiva = require("../../models/RedeProdutiva/RedeProdutiva")
redeProdutiva.use(cors())

process.env.SECRET_KEY = 'secret'

// Cadastro
redeProdutiva.post('/register', (req, res) => {
    RedeProdutiva.create(req.body)
    .then(redeProdutiva=>{
        res.json(redeProdutiva.dataValues);
    })
    .catch(err => {res.send('error: ' + err)})
})


//Busca
redeProdutiva.get('/list', (req, res) => {

    RedeProdutiva.findAll().then(redeProdutiva => {
        if(redeProdutiva){
            res.json(redeProdutiva)
        }else{
            res.send('Nada encontrado'); 
        }
    }).catch(err => {
        res.send('error: ' + err)
    }); 

});

module.exports = redeProdutiva