import { Component } from "@angular/core";
import { RequestService } from "../../service/request.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: "./tipoOrganizacao.component.html"
  })
export class TipoOrganizacaoComponent {
    registro = {
        idTipoOrganizacao: 0,
        nome_tipo: ""
    }

    constructor(private record: RequestService, private router: Router) {}

    tipoOrganizacao(){
        this.record.register(this.registro, 'tipoOrganizacao').subscribe(
            () => {
                window.alert("Tipo de Organizacao cadastrado com sucesso!!!"); 
                this.router.navigateByUrl("/");
            },
            err => {
                window.alert("Não foi possível cadastrar Atividade!!!"); 
                console.error(err);
            }
        );
    }
        
}