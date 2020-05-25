import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { RequestService } from "../../service/request.service";
import { Router } from "@angular/router";

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
  components = ['empreendimento', 'redeEconomica','geracaoRenda'];
  selects = []; 
  questoes = [];

  constructor(private readonly _formBuilder: FormBuilder, private record: RequestService, private router: Router) {}

  ngOnInit() {
    // TODO: add interfaces and enums wherever appropriate
    this.getInfo().then( () => {
      this.getQuestao('questao').then( result => {
        this.getAlternativas(result).then(
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
        record.findAll(element).subscribe(
            valores => { 
                // resolve(selects);
                selects.push(valores);
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
    
  getQuestao = (questao) => new Promise ((resolve, reject) => {
    this.record.findAll(questao).subscribe(
      resultados => { 
        resolve(resultados);
      },
      err => {
        reject(err); 
        console.error('EvolucaoComponent.ts: ', err); 
      }
    );
  }); 

  getAlternativas(resultados){
    let record = this.record;
    let questoes = this.questoes;

    questoes = _.map(resultados, (element) => new Promise ((resolve, reject) => {
      element.id_questao = element.idQuestao
      record.findAll('opcaoQuestao', {id_questao: element.idQuestao }).subscribe(
        result => { 
          element.options = result;
          resolve(element); 
        }); 
    })); 
    return Promise.all(questoes); 
  }
    
  buildQuestoes(questionsToBuild){
    let finalArray = []; 
    let data = {}; 
    let valorFinal; 

    valorFinal = _.map(questionsToBuild, (element) => new Promise ((resolve, reject) => {
        finalArray = _.map(element.options, (options) => new Promise ((resolve, reject) => {
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

    return Promise.all(valorFinal); 
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
    this.formSubmit.emit(this.formData);
  }

  trackByFn(index: number): number {
    return index;
  }
}