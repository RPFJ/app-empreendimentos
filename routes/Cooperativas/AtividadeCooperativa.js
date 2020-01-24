const express = require("express")
const atividadeCooperativa  = express.Router()
const cors = require("cors")

const AtividadeCooperativa = require("../../models/Cooperativas/AtividadeCooperativa")
atividadeCooperativa.use(cors())

process.env.SECRET_KEY = 'secret'

// Cadastro
atividadeCooperativa.post('/register', (req, res) => {
    AtividadeCooperativa.create(req.body)
        .then(atividadeCooperativa => { res.json(atividadeCooperativa)})
        .catch(err => {res.send('error: ' + err)})
})


module.exports = atividadeCooperativa