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

//Empreendimentos
var AreaAtuacao                 = require("./routes/Empreendimentos/AreaAtuacao");
var TipoContato                 = require("./routes/Empreendimentos/TipoContato");
var Localizacao                 = require("./routes/Empreendimentos/Localizacao");
var AtividadeEmpreendimento     = require("./routes/Empreendimentos/AtividadeEmpreendimento");
var FormacaoColetiva            = require("./routes/Empreendimentos/FormacaoColetiva");
var TipoOrganizacao             = require("./routes/Empreendimentos/TipoOrganizacao");
var Empreendimento              = require("./routes/Empreendimentos/Empreendimento");
var Contato                     = require("./routes/Empreendimentos/Contato");

app.use("/areaAtuacao", AreaAtuacao);
app.use("/tipoContato", TipoContato); 
app.use("/localizacao", Localizacao);
app.use("/atividadeEmpreendimento", AtividadeEmpreendimento); 
app.use("/formacaoColetiva", FormacaoColetiva);
app.use("/tipoOrganizacao", TipoOrganizacao); 
app.use("/empreendimento", Empreendimento );
app.use("/contato",Contato ); 

//Evolução
var Questao         = require("./routes/Evolucao/Questao");
var OpcaoQuestao    = require("./routes/Evolucao/OpcaoQuestao");
var Evolucao        = require("./routes/Evolucao/Evolucao");
var Resposta        = require("./routes/Evolucao/Resposta");

app.use("/questao", Questao); 
app.use("/opcaoQuestao", OpcaoQuestao); 
app.use("/evolucao", Evolucao); 
app.use("/resposta", Resposta); 

// Rede Economica

var TipoRede                    = require("./routes/RedeEconomica/TipoRede");
var Apoiador                    = require("./routes/RedeEconomica/Apoiador");
var RedeEconomica               = require("./routes/RedeEconomica/RedeEconomica");
var RedeApoiador                = require("./routes/RedeEconomica/RedeApoiador");

app.use("/apoiador", Apoiador); 
app.use("/tipoRede", TipoRede); 
app.use("/redeEconomica", RedeEconomica);
app.use("/redeApoiador", RedeApoiador);

app.listen(port, function(){
    console.log("Servidor acaba de subir na porta " + port)
})