const express = require("express")
const empreendimento  = express.Router()

const Empreendimento = require("../../models/Empreendimentos/Empreendimento")

process.env.SECRET_KEY = 'secret'

    // Cadastro
    empreendimento.post('/register', (req, res) => {
        Empreendimento.create(req.body)
        .then(empreendimento=>{
            res.json(empreendimento.dataValues);
        })
        .catch(err => {res.send('error: ' + err)})
    });


//Busca
//Busca
empreendimento.get('/list', (req, res) => {

    Empreendimento.findAll().then(empreendimento => {
        if(empreendimento){
            res.json(empreendimento)
        }else{
            res.send('Nada encontrado'); 
        }
    }).catch(err => {
        res.send('error: ' + err)
    }); 

});


module.exports = empreendimento