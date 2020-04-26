import { Component } from "@angular/core";
import { RequestService } from "../../service/request.service";
import { Router } from "@angular/router";
import * as _ from 'lodash';

@Component({
    templateUrl: "./evolucao.component.html",
    styles: ["./evolucao.component.css"]
  })
export class EvolucaoComponent {
    registro = {
        idEvolucao: 0,                   
        id_geracao_renda: 0,                    
        n_homens: 0,                     
        n_mulheres: 0,
        computador: 0, 
        internet: 0,                   
        id_empreendimento: 0,                   
        id_rede_economica: 0,                    
    }
    components = ['empreendimento', 'redeEconomica','geracaoRenda'];
    selects = []; 

    constructor(private record: RequestService, private router: Router) {
        this.getInfo();
    }

    getInfo (){
        let record = this.record; 
        let selects = this.selects;
        let components = this.components; 

        _.forEach(components, function(element) {
            record.findAll(element).subscribe(
                valores => { 
                    selects.push(valores);
                },
                err => {
                    console.error('EvolucaoComponent.ts: ', err); 
                }
            ); 
        });        
    }; 
    
    registrar() {
        this.record.register(this.registro, 'evolucao').subscribe(
            () => {
                window.alert("Relatório de evolução enviado com sucesso!!!"); 
                this.router.navigateByUrl("/");
            },
            err => {
                window.alert("Não foi possível enviar o relatório de evolução!!!"); 
                console.error(err);
            }
        );
    }
        
}