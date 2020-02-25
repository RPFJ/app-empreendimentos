import { Component } from "@angular/core";
import { RequestService } from "../../service/request.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: "./opcaoQuestao.component.html"
  })
export class OpcaoQuestaoComponent {
    registro = {
        idopcao : 0,
        desc_opcao: ""
    }
    values = [];

    constructor(private record: RequestService, private router: Router) {}

    opcaoQuestao(){
        this.record.register(this.registro, 'opcaoQuestao').subscribe(
            opcaoQuestao => {
                this.values = opcaoQuestao;
            },
            err => {
                window.alert("Não foi possível cadastrar Alternativa!!!"); 
                console.error(err);
            }
        );
    }
        
}