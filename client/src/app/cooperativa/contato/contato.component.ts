import { Component } from "@angular/core";
import { RequestService } from "../../service/request.service";
import { Router } from "@angular/router";


@Component({
    templateUrl: "./contato.component.html"
  })
export class ContatoComponent {
    registro = {
        idContato : 0,
        desc_contato: "",
        id_tipo_contato: 0,
        id_cooperativa: 0
    }
    details = [];
    coop = []; 
    
    constructor(private record: RequestService, private router: Router) { 
        this.getTpContato(); 
     }

    getTpContato (){
        this.record.findAll('tipoContato').subscribe(
            tipoContato => {
                this.details = tipoContato;
            },
            err => {
                console.error('ContatoComponent.ts: ', err); 
            }
        ); 

        //Cooperativas
        this.record.findAll('cooperativa').subscribe(
            cooperativa => {
                this.coop = cooperativa;
            },
            err => {
                console.error('ContatoComponent.ts: ', err); 
            }
        ); 
    }; 


    contato(){
        this.record.register(this.registro, 'contato' ).subscribe(
            () => {
                window.alert("Contato cadastrado com sucesso!!!"); 
                this.router.navigateByUrl("/");
            },
            err => {
                window.alert("Não foi possível cadastrar o contato!!!"); 
                console.error(err);
            }
        );
    }
        
}