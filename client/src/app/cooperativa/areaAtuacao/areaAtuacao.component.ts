import { Component } from "@angular/core";
import { RequestService } from "../../service/request.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: "./areaAtuacao.component.html"
  })
export class AreaAtuacaoComponent {
    
    registro = {
        idAreaAtuacao : 0,
        desc_area_atuacao: ""
    }

    constructor(private record: RequestService, private router: Router) {}

    areaAtuacao(){
        this.record.register(this.registro, 'areaAtuacao' ).subscribe(
            () => {
                window.alert("Area de Atuação cadastrada com sucesso!!!"); 
                this.router.navigateByUrl("/");
            },
            err => {
                window.alert("Não foi possível cadastrar a Área de Atuação!!!"); 
                console.error(err);
            }
        );
    }
        
}