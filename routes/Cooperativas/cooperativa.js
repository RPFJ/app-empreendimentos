const express = require("express")
const cooperativa  = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const Cooperativa = require("../../models/Cooperativas/Cooperativa")
cooperativa.use(cors())

process.env.SECRET_KEY = 'secret'

//CADASTRO
cooperativa.post('/register', (req, res) => {
    const today = new Date(); 
    const cooperativaData = {
        nome: req.body.nome,
        endereco: req.body.endereco,
        cidade: req.body.cidade,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        login: req.body.login,
        senha: req.body.senha,
        sigla: req.body.sigla,
        ano_inicio: req.body.ano_inicio,
        id_area_atuacao: req.body.id_area_atuacao,
        id_localizacao: req.body.id_localizacao,
        id_tipo_organizacao: req.body.id_tipo_organizacao,
        dt_cadastro: today
    }

    Cooperativa.findOne({
        where: {
            login: req.body.login
        }
    }).then(Cooperativa => {
        console.log(Cooperativa);
        
        if(!cooperativa){
            const hash = bcrypt.hashSync(cooperativaData.senha, 10)
            cooperativaData.senha = hash
            Cooperativa.create(cooperativaData).then(cooperativa => {
                let token = jwt.sign(cooperativa.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.json({token:   token })
            }).catch(err => {
                res.send('error: ' + err)
            })
        } else {
            res.json({err: 'Cooperativa já cadastrada'})
        }
    }).catch(err => {
        res.send('error: ' + err)
    })
})

module.exports = cooperativa