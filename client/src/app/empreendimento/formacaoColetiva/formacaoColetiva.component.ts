import { Component } from "@angular/core";
import { RequestService } from "../../service/request.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: "./formacaoColetiva.component.html"
  })
export class FormacaoColetivaComponent {
    registro = {
        idFormacao_coletiva : 0,
        desc_formacao_coletiva: ""
    }
        

    constructor(private record: RequestService, private router: Router) {}
    
    //Função responsável por cadastrar o conteúdo do formulário
    register(){
        this.record.register(this.registro, 'formacaoColetiva' ).subscribe(
            () => {
                window.alert("Formação Coletiva cadastrada com sucesso!!!"); 
                this.router.navigateByUrl("/");
            },
            err => {
                window.alert("Não foi possível cadastrar formação coletiva!!!"); 
                console.error(err);
            }
        );
    }
        
}