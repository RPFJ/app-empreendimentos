const express = require("express")
const areaAtuacao  = express.Router()
const cors = require("cors")

const AreaAtuacao = require("../../models/Cooperativas/AreaAtuacao")
areaAtuacao.use(cors())

process.env.SECRET_KEY = 'secret'

// Cadastro
areaAtuacao.post('/register', (req, res) => {
    AreaAtuacao.create(req.body)
        .then(areaAtuacao => { res.json(areaAtuacao)})
        .catch(err => {res.send('error: ' + err)})
})


//Busca
areaAtuacao.get('/list', (req, res) => {

    AreaAtuacao.findAll().then(areaAtuacao => {
        if(areaAtuacao){
            res.json(areaAtuacao)
        }else{
            res.send('Nada encontrado'); 
        }
    }).catch(err => {
        res.send('error: ' + err)
    }); 

});

module.exports = areaAtuacao