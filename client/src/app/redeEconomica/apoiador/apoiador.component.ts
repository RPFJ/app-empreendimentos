import { Component } from "@angular/core";
import { RequestService } from "../../service/request.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: "./apoiador.component.html"
  })
export class ApoaidorComponent {
    registro = {
        idApoiador: 0,
        nome: "",
        cidade: "",
        tipo_de_ajuda: ""
    }

    constructor(private record: RequestService, private router: Router) {}

    //Função responsável por cadastrar os apoiadores
    register(){
        this.record.register(this.registro, 'apoiador').subscribe(
            () => {
                window.alert("Apoiador cadastrado com sucesso!!!"); 
                this.router.navigateByUrl("/");
            },
            err => {
                window.alert("Não foi possível cadastrar Apoiador!!!"); 
                console.error(err);
            }
        );
    }
        
}