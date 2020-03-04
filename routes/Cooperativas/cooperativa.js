const express = require("express")
const cooperativa  = express.Router()

const Cooperativa = require("../../models/Cooperativas/Cooperativa")

process.env.SECRET_KEY = 'secret'

    // Cadastro
    cooperativa.post('/register', (req, res) => {
        Cooperativa.create(req.body)
        .then(cooperativa=>{
            res.json(cooperativa.dataValues);
        })
        .catch(err => {res.send('error: ' + err)})
    });


//Busca
cooperativa.get('/list', (req, res) => {

    Cooperativa.findAll().then(cooperativa => {
        if(cooperativa){
            res.json(cooperativa)
        }else{
            res.send('Nada encontrado'); 
        }
    }).catch(err => {
        res.send('error: ' + err)
    }); 

});

module.exports = cooperativa