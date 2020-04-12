const express = require("express")
const redeEconomica  = express.Router()
const cors = require("cors")

const RedeEconomica = require("../../models/RedeEconomica/RedeEconomica")
redeEconomica.use(cors())

process.env.SECRET_KEY = 'secret'

// Cadastro
redeEconomica.post('/register', (req, res) => {
    RedeEconomica.create(req.body)
    .then(redeEconomica=>{
        res.json(redeEconomica.dataValues);
    })
    .catch(err => {res.send('error: ' + err)})
})


//Busca
redeEconomica.get('/list', (req, res) => {

    RedeEconomica.findAll().then(redeEconomica => {
        if(redeEconomica){
            res.json(redeEconomica)
        }else{
            res.send('Nada encontrado'); 
        }
    }).catch(err => {
        res.send('error: ' + err)
    }); 

});

module.exports = redeEconomica