import { Component } from "@angular/core";
import { RequestService } from "../../service/request.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: "./localizacao.component.html"
  })
export class LocalizacaoComponent {
    registro = {
        idLocalizacao : 0,
        desc_localizacao: ""
    }
        

    constructor(private record: RequestService, private router: Router) {}

    localizacao(){
        this.record.register(this.registro, 'localizacao' ).subscribe(
            () => {
                window.alert("Localizacao cadastrado com sucesso!!!"); 
                this.router.navigateByUrl("/");
            },
            err => {
                window.alert("Não foi possível cadastrar Atividade!!!"); 
                console.error(err);
            }
        );
    }
        
}