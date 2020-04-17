const express = require("express")
const geracaoRenda  = express.Router()
const cors = require("cors")

const GeracaoRenda = require("../../models/Evolucao/GeracaoRenda")
geracaoRenda.use(cors())

process.env.SECRET_KEY = 'secret'

// Cadastro
geracaoRenda.post('/register', (req, res) => {
    GeracaoRenda.create(req.body)
        .then(geracaoRenda=> { res.json(geracaoRenda)})
        .catch(err => {res.send('error: ' + err)})
})


//Busca
geracaoRenda.get('/list', (req, res) => {

    GeracaoRenda.findAll().then(geracaoRenda => {
        if(geracaoRenda){
            console.log
            res.json(geracaoRenda)
        }else{
            res.send('Nada encontrado'); 
        }
    }).catch(err => {
        res.send('error: ' + err)
    }); 

});

module.exports = geracaoRenda; 