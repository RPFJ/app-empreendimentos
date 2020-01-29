const express = require("express")
const usuario  = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const Usuario = require("../models/Usuario")
usuario.use(cors())

process.env.SECRET_KEY = 'secret'

//CADASTRO
usuario.post('/register', (req, res) => {
    const today = new Date(); 
    const usuarioData = {
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        email: req.body.email,
        senha: req.body.senha,
        dt_cadastro: today
    }

    Usuario.findOne({
        where: {
            email: req.body.email
        }
    }).then(usuario => {        
        if(!usuario){
            const hash = bcrypt.hashSync(usuarioData.senha, 10)
            usuarioData.senha = hash
            Usuario.create(usuarioData).then(usuario => {
                let token = jwt.sign(usuario.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.json({token:   token })
            }).catch(err => {
                res.send('error: ' + err)
            })
        } else {
            res.json({err: 'Usuario já cadastrado'})
        }
    }).catch(err => {
        res.send('error: ' + err)
    })
})

//LOGIN 
usuario.post('/login', (req, res) => {
    Usuario.findOne({
      where: {
        email: req.body.email,
      }
    })
      .then(usuario => {
        if(bcrypt.compareSync(req.body.senha, usuario.senha)) {
            let token = jwt.sign(usuario.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
            })
            res.json({token:   token })
        } else {
          res.send('Usuário não existe!!!')
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })


//PROFILE
usuario.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    Usuario.findOne({
        where: {
            idUsuario: decoded.idUsuario
        }
    })
    .then(usuario => {
        if(usuario) {
            res.json(usuario)
        }else {
            res.send('Usuario não existe')
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})


module.exports = usuario