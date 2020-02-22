import { Component } from "@angular/core";
import { RequestService } from "../../service/request.service";
import { Router } from "@angular/router";


@Component({
    templateUrl: "./cooperativa.component.html"
  })
export class CooperativaComponent {
    registro = {
        nome: "", 
        endereco: "", 
        cidade: "", 
        latitude: 0, 
        longitude: 0, 
        sigla: "", 
        email: "", 
        ano_inicio: 0, 
        id_area_atuacao: 0, 
        id_localizacao: 0, 
        id_tipo_organizacao: 0,
        dt_cadastro: new Date() 
    }
    components = ['areaAtuacao', 'localizacao', 'tipoOrganizacao'];
    selects = []; 

    constructor(private record: RequestService, private router: Router) { 
        this.getInfo(this.components); 
     }

    getInfo (components){
        for(var i = 0; i < 3; i++){
            this.record.findAll(components[i]).subscribe(
                valores => {
                    this.selects.push(valores);
                },
                err => {
                    console.error('ContatoComponent.ts: ', err); 
                }
            ); 
        }

    }; 

    cooperativa(){
        this.record.register(this.registro, 'cooperativa' ).subscribe(
            () => {
                window.alert("Cooperativa Cadastrada com sucesso!!!"); 
                this.router.navigateByUrl("/");
            },
            err => {
                window.alert("Não foi possível cadastrar a Cooperativa!!!"); 
                console.error(err);
            }
        );
    }
        
}