import { Component } from "@angular/core";
import { RequestService } from "../../service/request.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: "./tipoRede.component.html"
  })
export class TipoRedeComponent {
    registro = {
        idTipo_rede: 0,
        desc_rede: ""
    }

    constructor(private record: RequestService, private router: Router) {}

    register(){
        this.record.register(this.registro, 'tipoRede').subscribe(
            () => {
                window.alert("Tipo de Rede cadastrado com sucesso!!!"); 
                this.router.navigateByUrl("/");
            },
            err => {
                window.alert("Não foi possível cadastrar Tipo de Rede!!!"); 
                console.error(err);
            }
        );
    }
        
}