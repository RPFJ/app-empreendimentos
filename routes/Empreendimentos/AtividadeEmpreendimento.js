const express = require("express")
const atividadeEmpreendimento  = express.Router()
const cors = require("cors")

const AtividadeEmpreendimento = require("../../models/Empreendimentos/AtividadeEmpreendimento")
atividadeEmpreendimento.use(cors())

process.env.SECRET_KEY = 'secret'

// Cadastro
atividadeEmpreendimento.post('/register', (req, res) => {
    AtividadeEmpreendimento.create(req.body)
        .then(atividadeEmpreendimento => { res.json(atividadeEmpreendimento)})
        .catch(err => {res.send('error: ' + err)})
})



//Busca
atividadeEmpreendimento.get('/list', (req, res) => {

    AtividadeEmpreendimento.findAll().then(atividadeEmpreendimento => {
        if(atividadeEmpreendimento){
            res.json(atividadeEmpreendimento)
        }else{
            res.send('Nada encontrado'); 
        }
    }).catch(err => {
        res.send('error: ' + err)
    }); 

});

module.exports = atividadeEmpreendimento