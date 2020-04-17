import { Component } from "@angular/core";
import { RequestService } from "../../service/request.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: "./geracaoRenda.component.html"
  })
export class GeracaoRendaComponent {
    registro = {
        idGeracao_Renda : 0,
        desc_renda: ""
    }

    constructor(private record: RequestService, private router: Router) {}

    geracaoRenda(){
        this.record.register(this.registro, 'geracaoRenda').subscribe(
            () => {
                window.alert("Geração de Renda cadastrada com sucesso!!!"); 
                this.router.navigateByUrl("/");
            },
            err => {
                window.alert("Não foi possível cadastrar a Geração de Renda!!!"); 
                console.error(err);
            }
        );
    }
        
}