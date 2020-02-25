import { Component, OnInit } from "@angular/core";
import { RequestService } from "../../service/request.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
    templateUrl: "./questao.component.html"
  })
export class QuestaoComponent {
    registro = {
        idQuestao : 0,
        desc_questao: ""
    }  
    registrationForm: FormGroup;

    get descQuestao(){
        return this.registrationForm.get('desc_questao'); 
    }

    
    get alternativas(){
        return this.registrationForm.get('alternativas') as FormArray;
    }

    addalternativa() {
        this.alternativas.push(this.fb.control('')); 
    }

    remAlternativa(){
        this.alternativas.removeAt(this.alternativas.length - 1); 
    }

    constructor(private record: RequestService, private router: Router,private fb: FormBuilder) { 
    }

    register(dados){
        let alternativas = dados.alternativas; 
        var array = {
            idOpcao: 0,  
            desc_opcao: "",
            id_questao: 0
        }; 
        this.registro.desc_questao = dados.desc_questao; 
        // Cadastra e retorna o objeto em "questao"
        this.record.register(this.registro, 'questao' ).subscribe(
            questao => {
                // Builda as alternativas adicionando o codigo de 
                // questao retornado da funcao anterior
                // em seguida faz o cadastro de cada uma das alternativas
                alternativas.forEach(element => {
                    array.desc_opcao = element;
                    array.id_questao = questao.idQuestao; 
                    this.record.register(array, 'opcaoQuestao').subscribe(); 
                });
                window.alert("Localizacao cadastrado com sucesso!!!"); 
                this.router.navigateByUrl("/");
            },
            err => {
                window.alert("Não foi possível cadastrar a Questao!!!"); 
                console.error(err);
            }
        );
    }
    
    ngOnInit(){
        this.registrationForm = this.fb.group({
            desc_questao: '',
            alternativas: this.fb.array([''])
        });
    }
    
    onSubmit(){
        console.log(this.registrationForm.value); 
        this.register(this.registrationForm.value); 
    }
}