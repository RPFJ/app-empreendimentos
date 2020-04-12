import { Component } from "@angular/core";
import { RequestService } from "../../service/request.service";
import { Router } from "@angular/router";
import * as _ from 'lodash';

@Component({
    templateUrl: "./evolucao.component.html"
  })
export class EvolucaoComponent {
    registro = {
        idEvolucao: 0,                   
        geracao_renda: 0,                    
        n_homens: 0,                     
        n_mulheres: 0,
        computador: 0, 
        internet: 0,                   
        id_empreendimento: 0,                   
        id_rede_economica: 0,                    

    }
    components = ['empreendimento', 'redeEconomica',];
    selects = []; 

    constructor(private record: RequestService, private router: Router) {
        this.getInfo();
    }

    getInfo (){
        let record = this.record; 
        let selects = this.selects;
        let components = this.components; 
        console.log('record', record);
        console.log('selects', selects);
        console.log('components', components);

        _.forEach(components, function(element) {
            record.findAll(element).subscribe(
                valores => {
                    console.log('valores', valores);
            selects.push(valores);
                    console.log('selects', selects);
                },
                err => {
                    console.error('EvolucaoComponent.ts: ', err); 
                }
            ); 
        });        
    }; 


        
}