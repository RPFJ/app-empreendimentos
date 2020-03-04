const express = require("express")
const tipoRede  = express.Router()
const cors = require("cors")

const TipoRede = require("../../models/RedeProdutiva/TipoRede")
tipoRede.use(cors())

process.env.SECRET_KEY = 'secret'

// Cadastro
tipoRede.post('/register', (req, res) => {
    TipoRede.create(req.body)
        .then(tipoRede => { res.json(tipoRede)})
        .catch(err => {res.send('error: ' + err)})
})


//Busca
tipoRede.get('/list', (req, res) => {

    TipoRede.findAll().then(tipoRede => {
        if(tipoRede){
            res.json(tipoRede)
        }else{
            res.send('Nada encontrado'); 
        }
    }).catch(err => {
        res.send('error: ' + err)
    }); 

});

module.exports = tipoRede