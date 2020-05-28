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

  ngOnInit() {
    // TODO: add interfaces and enums wherever appropriate
    this.getInfo().then( () => {
      this.getDataValues('questao').then( result => {
        this.getQuestionOptions(result).then(
          questoes => {
            this.buildQuestoes(questoes).then(
              formItems => {
                this.buildFinal(formItems); 
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
    //funcao build final foi removida daqui
  }


  buildFinal(formItens){
    this.stepItems = _.concat(this.stepItems, formItens);
    this.stepItems.push( { label: 'Review & Submit', data: {} }); 

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

  getInfo = ()  => new Promise((resolve, reject) => {
    let record = this.record; 
    let selects = this.selects;
    let components = this.components; 
    _.forEach(components, function(element) {
        record.findAll(element.table).subscribe(
            resultSet => { 
                // resolve(selects);
                _.map(resultSet, (resultItem)  => {
                  resultItem.value = resultItem[element.field]
                });
                selects.push(resultSet);
            },
            err => {
              reject(err); 
                console.error('EvolucaoComponent.ts: ', err); 
            }
        ); 
    });
    if(selects){
      resolve(selects);
    } else {
      reject('erro'); 
    }
  });
    
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
            data[element.idQuestao]= { type: 'radio', options: opcoes, validations:{}, errors: {}};
            resolve({ label: element.desc_questao, data: data});
          }
        }); 
    })); 

    return Promise.all(buildedQuestions); 
  }
  
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

  prepareData(formResult){
    let evolution = this.setEvolucao(formResult);
    this.setAnswers(formResult); 
    let answers = this.answers;
    this.register(evolution, answers)
  }

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

  goToStep(step: string): void {
    this.activeStepIndex =
      step === 'prev' ? this.activeStepIndex - 1 : this.activeStepIndex + 1;
    
    this.setFormPreview();
  }

  setFormPreview(): void {
    this.formData = this.masterForm.reduce(
      (masterForm, currentForm) => ({ ...masterForm, ...currentForm.value }),
      {}
    );

    this.masterFormFields = Object.keys(this.formData);
  }

  onFormSubmit(): void {
    // emit aggregate form data to parent component, where we POST
    console.log('Dados: ', this.formData);
   // this.formSubmit.emit(this.formData);
   this.prepareData(this.formData);
  }

  trackByFn(index: number): number {
    return index;
  }
}