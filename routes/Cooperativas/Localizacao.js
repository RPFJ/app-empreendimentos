const express = require("express")
const localizacao  = express.Router()
const cors = require("cors")

const Localizacao = require("../../models/Cooperativas/Localizacao")
localizacao.use(cors())

process.env.SECRET_KEY = 'secret'

// Cadastro
localizacao.post('/register', (req, res) => {
    Localizacao.create(req.body)
        .then(localizacao => { res.json(localizacao)})
        .catch(err => {res.send('error: ' + err)})
})


module.exports = localizacao