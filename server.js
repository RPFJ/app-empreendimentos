var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
var app = express()
var port = process.env.port || 3000

app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({extended:false})
);


//Adm 
var Usuario = require("./routes/Usuario");

app.use("/usuario", Usuario);

//Cooperativa
var AreaAtuacao             = require("./routes/Cooperativas/AreaAtuacao");
var TipoContato             = require("./routes/Cooperativas/TipoContato");
var Localizacao             = require("./routes/Cooperativas/Localizacao");
var AtividadeCooperativa    = require("./routes/Cooperativas/AtividadeCooperativa");
var FormacaoColetiva        = require("./routes/Cooperativas/FormacaoColetiva");

app.use("/areaAtuacao", AreaAtuacao);
app.use("/tipoContato", TipoContato); 
app.use("/localizacao", Localizacao);
app.use("/atividadeCooperativa", AtividadeCooperativa); 
app.use("/formacaoColetiva", FormacaoColetiva);

//Evolução
var Questao = require("./routes/Evolucao/Questao");

app.use("/questao", Questao); 

app.listen(port, function(){
    console.log("Servidor acaba de subir na porta " + port)
})