const express = require("express")
const tipoContato  = express.Router()
const cors = require("cors")

const TipoContato = require("../../models/Cooperativas/TipoContato")
tipoContato.use(cors())

process.env.SECRET_KEY = 'secret'

// Cadastro
tipoContato.post('/register', (req, res) => {
    TipoContato.create(req.body)
        .then(tipoContato=> { res.json(tipoContato)})
        .catch(err => {res.send('error: ' + err)})
})


module.exports = tipoContato