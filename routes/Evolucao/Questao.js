const express = require("express")
const questao  = express.Router()
const cors = require("cors")

const Questao = require("../../models/Evolucao/Questao")
questao.use(cors())

process.env.SECRET_KEY = 'secret'

// Cadastro
questao.post('/register', (req, res) => {
    Questao.create(req.body)
        .then(questao => { res.json(questao)})
        .catch(err => {res.send('error: ' + err)})
})


module.exports = questao; 