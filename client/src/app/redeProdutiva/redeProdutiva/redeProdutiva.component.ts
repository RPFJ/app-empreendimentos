import { Component, ViewChild, ElementRef } from "@angular/core";
import { RequestService } from "../../service/request.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl,FormArray, FormBuilder } from '@angular/forms'
import * as _ from 'lodash';

@Component({
    templateUrl: "./redeProdutiva.component.html"
  })
export class RedeProdutivaComponent {
    registro = {
        desc_nome: "", 
        latitude: 0, 
        longitude: 0, 
        id_tipo_rede: 0,
    }

    registrationForm: FormGroup;
    components = ['tipoRede', 'apoiador'];
    selects = []; 
    dadosApoiadores= []; 


    get desc_rede(){
        return this.registrationForm.get('desc_rede'); 
    }
    get latitude(){
        return this.registrationForm.get('latitude'); 
    }
    get longitude(){
        return this.registrationForm.get('longitude'); 
    }
    get id_tipo_rede(){
        return this.registrationForm.get('id_tipo_rede'); 
    }

    apoiadores() : FormArray {
        return this.registrationForm.get('apoiadores') as FormArray
    }

    newApoiador(): FormGroup {
        return this.fb.group({
          nome: '',
          idApoiador: '',
        })
    }

    addApoiador() {
        this.apoiadores().push(this.newApoiador());
    }

    remApoiador(i:number) {
        this.apoiadores().removeAt(i);
      }


    constructor(private record: RequestService, private router: Router,private fb: FormBuilder) { 
    }

    getInfo (components){
        let record = this.record; 
        let selects = this.selects; 
        _.forEach(components, function(element) {
            record.findAll(element).subscribe(
                valores => {
                    selects.push(valores);
                },
                err => {
                    console.error('ContatoComponent.ts: ', err); 
                }
            ); 
        }); 
    }; 


    register(dados){
        let redeApoiadores = dados.apoiadores;
        var redeApoiador = {
            id_rede_produtiva: 0,
            id_apoiador: 0
        };

        console.log('redeApoiadores', redeApoiadores);

        delete dados.apoiadores
        console.log('Dados: ', dados);

        this.record.register(dados, 'redeProdutiva' ).subscribe(
            redeProdutiva => {
                console.log('Rede Retorno: ', redeProdutiva); 
                redeApoiadores.forEach( element => {
                    redeApoiador.id_apoiador = element.idApoiador;
                    redeApoiador.id_rede_produtiva = redeProdutiva.idRede_produtiva;
                    console.log('Rede Apoiador: ', redeApoiador); 
                    this.record.register(redeApoiador, 'redeApoiador' ).subscribe();
                });
                window.alert("Rede Produtiva cadastrada com sucesso!!!"); 
                // this.router.navigateByUrl("/");
            },
            err => {
                window.alert("Não foi possível cadastrar a Rede Produtiva !!!"); 
                console.error(err);
            }
        );
    }

    ngOnInit(){
        this.getInfo(this.components); 
        this.registrationForm = this.fb.group({
            desc_rede: "", 
            latitude: 0, 
            longitude: 0, 
            id_tipo_rede: 0, 
            apoiadores: this.fb.array([this.newApoiador()])
        });
    }

    onSubmit() {
        console.log('Valores passados', this.registrationForm.value);  
        this.register(this.registrationForm.value); 
    }
}