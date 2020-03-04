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

//Cooperativas
var AreaAtuacao             = require("./routes/Cooperativas/AreaAtuacao");
var TipoContato             = require("./routes/Cooperativas/TipoContato");
var Localizacao             = require("./routes/Cooperativas/Localizacao");
var AtividadeCooperativa    = require("./routes/Cooperativas/AtividadeCooperativa");
var FormacaoColetiva        = require("./routes/Cooperativas/FormacaoColetiva");
var TipoOrganizacao         = require("./routes/Cooperativas/TipoOrganizacao");
var Cooperativa             = require("./routes/Cooperativas/Cooperativa");
var Contato                 = require("./routes/Cooperativas/Contato");

app.use("/areaAtuacao", AreaAtuacao);
app.use("/tipoContato", TipoContato); 
app.use("/localizacao", Localizacao);
app.use("/atividadeCooperativa", AtividadeCooperativa); 
app.use("/formacaoColetiva", FormacaoColetiva);
app.use("/tipoOrganizacao", TipoOrganizacao); 
app.use("/cooperativa",Cooperativa );
app.use("/contato",Contato ); 

//Evolução
var Questao = require("./routes/Evolucao/Questao");
var OpcaoQuestao = require("./routes/Evolucao/OpcaoQuestao");

app.use("/questao", Questao); 
app.use("/opcaoQuestao", OpcaoQuestao); 

// Rede Produtiva

var TipoRede                 = require("./routes/RedeProdutiva/TipoRede");

app.use("/tipoRede", TipoRede); 


app.listen(port, function(){
    console.log("Servidor acaba de subir na porta " + port)
})