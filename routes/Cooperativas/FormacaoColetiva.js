const express = require("express")
const formacaoColetiva  = express.Router()
const cors = require("cors")

const FormacaoColetiva = require("../../models/Cooperativas/FomacaoColetiva")
formacaoColetiva.use(cors())

process.env.SECRET_KEY = 'secret'

// Cadastro
formacaoColetiva.post('/register', (req, res) => {
    FormacaoColetiva.create(req.body)
        .then(formacaoColetiva => { res.json(formacaoColetiva)})
        .catch(err => {res.send('error: ' + err)})
})


module.exports = formacaoColetiva