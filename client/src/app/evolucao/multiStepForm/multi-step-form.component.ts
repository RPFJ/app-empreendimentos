import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { RequestService } from "../../service/request.service";
import { Router } from "@angular/router";
import { elementAt } from 'rxjs/operators';

@Component({
  selector: 'app-multi-step-form',
  templateUrl: './multi-step-form.component.html',
  styleUrls: ['./multi-step-form.component.css']
})
export class MultiStepFormComponent implements OnInit {
  @Input() formContent: any;

  @Output() readonly formSubmit: EventEmitter<any> = new EventEmitter<any>();

  // Definição incial das variáveis de controle para montar o formulário multi-step
  activeStepIndex: number;
  currentFormContent: Array<any>;
  formData: any;
  formFields: Array<Array<string>>;
  masterFormFields: Array<string>;
  stepItems: Array<any>;
  masterForm: Array<FormGroup>;
  components = [{table:'empreendimento', field: 'idEmpreendimento' }, {table:'redeEconomica', field: 'idRede_economica' }, {table:'geracaoRenda', field: 'idGeracao_renda' }];
  selects = []; 
  questions = [];
  answers = []; 
  evolucao = {
    idEvolucao: 0,                   
    id_geracao_renda: 0,                    
    n_homens: 0,                     
    n_mulheres: 0,
    computador: 0, 
    internet: 0,                   
    id_empreendimento: 0,                   
    id_rede_economica: 0,                    
}

  constructor(private readonly _formBuilder: FormBuilder, private record: RequestService, private router: Router) {}

  // Função de inicialização
  // Cria todos os arrays necessários e busca as informações para inciar o formulário multi-step
  ngOnInit() {
    // Busca todas as informações necesárias para a construção do formulário
    this.getInfo().then( () => {
      this.getDataValues('questao').then( result => {
        this.getQuestionOptions(result).then(
          questoes => {
            this.buildQuestoes(questoes).then(
              formItems => {
                this.buildFormItems(formItems); 
              }
            );
          }
        ); 
      } );   
    }); 
    this.activeStepIndex = 0;
    this.masterForm = [];
    this.currentFormContent = [];
    this.formFields = [];
    this.stepItems = this.formContent;
  }

  // Recebe as informações da bunsca no banco de dados e adiciona aos dados do Array STEP_ITEMS 
  buildFormItems(formItems){
    this.stepItems = _.concat(this.stepItems, formItems);
    //this.stepItems.push( { label: 'Revisão e Confirmação de Envio', data: {} }); 

    // NOTE: this can be cofigured to create a single form when needed
    this.stepItems.forEach((data, i) => {
      // holds name, validators, placeholder of all steps
      this.currentFormContent.push(this.stepItems[i]['data']); 

      // holds string values for each field of all steps
      this.formFields.push(Object.keys(this.currentFormContent[i]));

      // holds all form groups
      this.masterForm.push(this.buildForm(this.currentFormContent[i]));

    });
  }

  // Busca informações necessárias para a listagem de dados de outras tabelas
  getInfo = ()  => new Promise((resolve, reject) => {
    let record = this.record; 
    let selects = this.selects;
    let components = this.components; 
    _.forEach(components, function(element) {
        record.findAll(element.table).subscribe(
            resultSet => { 
                _.map(resultSet, (resultItem)  => {
                  resultItem.value = resultItem[element.field]
                });
                selects.push(resultSet);
            },
            err => {
              reject(err); 
            }
        ); 
    });
    if(selects){
      resolve(selects);
    } else {
      reject('erro'); 
    }
  });
  
  // Busca informações do banco de dados de acordo com a tabela e retorna o objeto
  getDataValues = (table) => new Promise ((resolve, reject) => {
    this.record.findAll(table).subscribe(
      resultSet => { 
        resolve(resultSet);
      },
      err => {
        reject(err); 
        console.error('EvolucaoComponent.ts: ', err); 
      }
    );
  }); 

  // Adiciona alternativas às questões recebidas como parâmetro
  getQuestionOptions(emptyQuestions){
    let record    = this.record;
    let fullQuestions = this.questions;

    fullQuestions = _.map(emptyQuestions, (element) => new Promise ((resolve, reject) => {
      element.id_questao = element.idQuestao
      record.findAll('opcaoQuestao', {id_questao: element.idQuestao }).subscribe(
        result => { 
          element.options = result;
          resolve(element); 
        }); 
    })); 
    return Promise.all(fullQuestions); 
  }
  
  // Construção e definição das respostas de cada uma das questões
  // Logo após, adiciona os dados à estrutura do formulário 
  buildQuestoes(questionsToBuild){
    let finalArray = []; 
    let data = {}; 
    let buildedQuestions; 

    buildedQuestions = _.map(questionsToBuild, (element) => new Promise ((resolve) => {
        finalArray = _.map(element.options, (options) => new Promise ((resolve) => {
          resolve({id: options.idOpcao, name: options.id_questao, value: options.idOpcao, descricao: options.desc_opcao}); 
        }))
        Promise.all(finalArray).then( opcoes => {
          if(opcoes[0].name == element.idQuestao ){
            data = {};
            data[element.idQuestao]= { type: 'radio', options: opcoes, validations:{  required: true}, errors: {required: 'Esse campo não pode ser nulo'}};
            resolve({ label: element.desc_questao, data: data});
          }
        }); 
    })); 

    return Promise.all(buildedQuestions); 
  }
  
  // Contrução do objeto de evolução para salvar no banco de dados
  setEvolucao(dataSet) {
    this.evolucao = {
      idEvolucao: 0,                   
      id_geracao_renda: dataSet.geraçãoDeRenda,                     
      n_homens: dataSet.númeroHomens,                     
      n_mulheres: dataSet.númeroMulheres,
      computador: dataSet.computador, 
      internet: dataSet.internet,                   
      id_empreendimento: dataSet.empreendimento,                   
      id_rede_economica: dataSet.redeEconômica                    
    }
    return this.evolucao; 
  }

  // Construção dos objetos de cada uma das respostas para salvar no banco de dados
  async setAnswers(dataSet){
    let questions = [];
    let answers = [];
    let answer = {
      idReposta   : 0, 
      id_questao  : 0,
      id_evolucao : 0,
      id_opcao_questao : 0
    };

    questions = [await this.getDataValues('questao')];

    answers = _.forEach(questions[0], element => {
      answer = {
        idReposta: 0, 
        id_questao:0,
        id_evolucao:0,
        id_opcao_questao : 0
      };
      answer.id_questao = element.idQuestao;
      answer.id_evolucao = 0
      answer.id_opcao_questao = dataSet[element.idQuestao];
      this.answers.push(answer); 
    })
  }

  // Estruturação dos dados do formulário para efetuar o cadastro
  prepareData(formResult){
    let evolution = this.setEvolucao(formResult);
    this.setAnswers(formResult); 
    let answers = this.answers;
    this.register(evolution, answers)
  }

  // Cadastro de Evolução e suas respostas.
  register(evolution, answers) {
    this.record.register(evolution, 'evolucao' ).subscribe(
      evolucao => {
          answers.forEach( resposta => {
            resposta.id_evolucao = evolucao.idEvolucao;
              this.record.register(resposta, 'resposta' ).subscribe();
          });
          window.alert("Relatório de Evolução enviado com sucesso!!!"); 
          this.router.navigateByUrl("/");
      },
      err => {
          window.alert("Não foi possível cadastrar a Empreendimento!!!"); 
          console.error(err);
      }
  );
}

  // build separate FormGroups for each form
  buildForm(currentFormContent: any): FormGroup {
    const formDetails = Object.keys(currentFormContent).reduce(
      (obj, key) => {
        obj[key] = ['', this.getValidators(currentFormContent[key])];

        return obj;
      },
      {}
    );

    return this._formBuilder.group(formDetails);
  }

  // get validator(s) for each field, if any
  getValidators(formField: any): Validators {
    const fieldValidators = Object.keys(formField.validations).map(validator => {
      if (validator === 'required') {
        return Validators[validator];
      } else {
        return Validators[validator](formField.validations[validator]);
      }
    });

    return fieldValidators;
  }

  // get validation error messages per error, per field
  getValidationMessage(formIndex: number, formFieldName: string): string {
    const formErrors = this.masterForm[formIndex].get(formFieldName).errors;
    const errorMessages = this.currentFormContent[formIndex][formFieldName]
      .errors;
    const validationError = errorMessages[Object.keys(formErrors)[0]];

    return validationError;
  }

  // Troca de etapa do formulário
  goToStep(step: string): void {
    this.activeStepIndex =
      step === 'prev' ? this.activeStepIndex - 1 : this.activeStepIndex + 1;
    
    this.setFormPreview();
  }

  // Define a tela de revisão do formulário
  setFormPreview(): void {
    this.formData = this.masterForm.reduce(
      (masterForm, currentForm) => ({ ...masterForm, ...currentForm.value }),
      {}
    );

    this.masterFormFields = Object.keys(this.formData);
  }

  onFormSubmit(): void {
   console.log('Dados: ', this.formData);
   this.prepareData(this.formData);
  }

  trackByFn(index: number): number {
    return index;
  }
}