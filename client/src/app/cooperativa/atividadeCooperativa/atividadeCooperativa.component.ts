import { Component } from "@angular/core";
import { RequestService } from "../../service/request.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: "./atividadeCooperativa.component.html"
  })
export class AtividadeCooperativaComponent {
    
    registro = {
        idAtividade : 0,
        desc_atividade: ""
    }

    constructor(private record: RequestService, private router: Router) {}

    atividadeCooperativa(){
        this.record.register(this.registro, 'atividadeCooperativa' ).subscribe(
            () => {
                window.alert("Atividade cadastrada com sucesso!!!"); 
                this.router.navigateByUrl("/");
            },
            err => {
                window.alert("Não foi possível cadastrar Atividade!!!"); 
                console.error(err);
            }
        );
    }
        
}