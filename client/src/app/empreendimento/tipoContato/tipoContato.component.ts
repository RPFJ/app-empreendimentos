import { Component } from "@angular/core";
import { RequestService } from "../../service/request.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: "./tipoContato.component.html"
  })
export class TipoContatoComponent {
    registro = {
        idTipo_contato : 0,
        nome_tipo: ""
    }

    constructor(private record: RequestService, private router: Router) {}

    tipoContato(){
        this.record.register(this.registro, 'tipoContato').subscribe(
            () => {
                window.alert("Tipo de Contato cadastrado com sucesso!!!"); 
                this.router.navigateByUrl("/");
            },
            err => {
                window.alert("Não foi possível cadastrar o Tipo de Contato!!!"); 
                console.error(err);
            }
        );
    }
        
}