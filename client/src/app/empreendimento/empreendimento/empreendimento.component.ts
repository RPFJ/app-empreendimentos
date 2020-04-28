import { Component, ViewChild, ElementRef } from "@angular/core";
import { RequestService } from "../../service/request.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl,FormArray, FormBuilder } from '@angular/forms'
import * as _ from 'lodash';

@Component({
    templateUrl: "./empreendimento.component.html"
  })
export class EmpreendimentoComponent {
    registro = {
        descricao: "", 
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

    registrationForm: FormGroup;
    components = ['areaAtuacao', 'localizacao', 'tipoOrganizacao', 'tipoContato'];
    selects = []; 


    get descricao(){
        return this.registrationForm.get('descricao'); 
    }
    get endereco(){
        return this.registrationForm.get('endereco'); 
    }
    get cidade(){
        return this.registrationForm.get('cidade'); 
    }
    get latitude(){
        return this.registrationForm.get('latitude'); 
    }
    get longitude(){
        return this.registrationForm.get('longitude'); 
    }
    get sigla(){
        return this.registrationForm.get('sigla'); 
    }
    get email(){
        return this.registrationForm.get('email'); 
    }
    get ano_inicio(){
        return this.registrationForm.get('ano_inicio'); 
    }
    get id_area_atuacao(){
        return this.registrationForm.get('id_area_atuacao'); 
    }
    get id_localizacao(){
        return this.registrationForm.get('id_localizacao'); 
    }
    get id_tipo_organizacao(){
        return this.registrationForm.get('id_tipo_organizacao'); 
    }
    contatos() : FormArray {
        return this.registrationForm.get('contatos') as FormArray
    }

    newContato(): FormGroup {
        return this.fb.group({
          descContato: '',
          idTpContato: '',
        })
    }

    addContato() {
        this.contatos().push(this.newContato());
    }

    remContato(i:number) {
        this.contatos().removeAt(i);
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
                    console.error('EmpreendimentoComponent.ts: ', err); 
                }
            ); 
        }); 
        
    }; 

    register(dados){
        let contatos = dados.contatos;
        var contato = {
            idContato : 0,
            desc_contato: "",
            id_tipo_contato: 0,
            id_empreendimento: 0
        };

        delete dados.contatos
        this.record.register(dados, 'empreendimento' ).subscribe(
            empreendimento => {
                contatos.forEach( element => {
                    contato.desc_contato = element.descContato;
                    contato.id_tipo_contato = element.idTpContato;
                    contato.id_empreendimento = empreendimento.idEmpreendimento;
                    this.record.register(contato, 'contato' ).subscribe();
                });
                window.alert("Empreendimento cadastrada com sucesso!!!"); 
                this.router.navigateByUrl("/");
            },
            err => {
                window.alert("Não foi possível cadastrar a Empreendimento!!!"); 
                console.error(err);
            }
        );
    }

    ngOnInit(){
        this.getInfo(this.components); 
        console.log('selects: ', this.selects)
        this.registrationForm = this.fb.group({
            descricao: "", 
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
            contatos: this.fb.array([this.newContato()])
        });
    }

    onSubmit() {
        this.register(this.registrationForm.value); 
    }
}