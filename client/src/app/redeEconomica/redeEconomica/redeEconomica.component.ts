import { Component, ViewChild, ElementRef } from "@angular/core";
import { RequestService } from "../../service/request.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl,FormArray, FormBuilder } from '@angular/forms'
import * as _ from 'lodash';

@Component({
    templateUrl: "./redeEconomica.component.html"
  })
export class RedeEconomicaComponent {
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


    get descricao(){
        return this.registrationForm.get('descricao'); 
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

    // Adiciona um novo apoiador ao formulário
    newApoiador(): FormGroup {
        return this.fb.group({
          nome: '',
          idApoiador: '',
        })
    }

     // Adiciona um novo apoiador ao array de apoiador do formulário
    addApoiador() {
        this.apoiadores().push(this.newApoiador());
    }

    remApoiador(i:number) {
        this.apoiadores().removeAt(i);
      }


    constructor(private record: RequestService, private router: Router,private fb: FormBuilder) { 
    }

    // Busca as informações necessárias para os campos de listagem
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

    // Estrutura as informações e salva no banco de dados
    register(dados){
        let redeApoiadores = dados.apoiadores;
        var redeApoiador = {
            id_rede_economica: 0,
            id_apoiador: 0
        };

        // Apaga o item apoiadores do objeto dados
        delete dados.apoiadores

        this.record.register(dados, 'redeEconomica' ).subscribe(
            redeEconomica => {
                redeApoiadores.forEach( element => {
                    redeApoiador.id_apoiador = element.idApoiador;
                    redeApoiador.id_rede_economica = redeEconomica.idRede_produtiva;
                    this.record.register(redeApoiador, 'redeApoiador' ).subscribe(); 
                });
                window.alert("Rede Economica cadastrada com sucesso!!!"); 
                this.router.navigateByUrl("/");
            },
            err => {
                window.alert("Não foi possível cadastrar a Rede Economica !!!"); 
                console.error(err);
            }
        );
    }

    // Inicialização do formulário buscando todos os dados necessários para o funcionamento
    ngOnInit(){
        this.getInfo(this.components); 
        this.registrationForm = this.fb.group({
            descricao: "", 
            latitude: 0, 
            longitude: 0, 
            id_tipo_rede: 0, 
            apoiadores: this.fb.array([this.newApoiador()])
        });
    }

    // Ao clicar no botão "Enviar" chama função para 
    onSubmit() {
        this.register(this.registrationForm.value); 
    }
}