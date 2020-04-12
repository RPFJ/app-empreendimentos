const express = require("express")
const contato  = express.Router()
const cors = require("cors")

const Contato = require("../../models/Empreendimentos/Contato")
contato.use(cors())

process.env.SECRET_KEY = 'secret'

// Cadastro
contato.post('/register', (req, res) => {
    Contato.create(req.body)
        .then(contato => { res.json(contato)})
        .catch(err => {res.send('error: ' + err)})
});

module.exports = contato