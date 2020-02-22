const express = require("express")
const tipoOrganizacao  = express.Router()
const cors = require("cors")

const TipoOrganizacao = require("../../models/Cooperativas/TipoOrganizacao")
tipoOrganizacao.use(cors())

process.env.SECRET_KEY = 'secret'

// Cadastro
tipoOrganizacao.post('/register', (req, res) => {
    TipoOrganizacao.create(req.body)
        .then(tipoOrganizacao=> { res.json(tipoOrganizacao)})
        .catch(err => {res.send('error: ' + err)})
})


//Busca
tipoOrganizacao.get('/list', (req, res) => {

    TipoOrganizacao.findAll().then(tipoOrganizacao => {
        if(tipoOrganizacao){
            res.json(tipoOrganizacao)
        }else{
            res.send('Nada encontrado'); 
        }
    }).catch(err => {
        res.send('error: ' + err)
    }); 

});

module.exports = tipoOrganizacao