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
    this.getInfo(); 
    
    this.activeStepIndex = 0;
    this.masterForm = [];
    this.currentFormContent = [];
    this.formFields = [];
    this.stepItems = this.formContent;
    console.log('o que tem aqui', this.stepItems); 
    
    //funcao build final foi removida daqui
  }


  buildFinal(){
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
    this.getQuestao('questao'); 
  };
    
  getQuestao(questao){
    this.record.findAll(questao).subscribe(
      resultados => { 
        this.getAlternativas(resultados); 
      },
      err => {
          console.error('EvolucaoComponent.ts: ', err); 
      }
    );
  }

  getAlternativas (resultados){
    
    let record = this.record;
    let questoes = this.questoes;
    let $this = this
    _.forEach(resultados, function(element) {
      element.id_questao = element.idQuestao
      console.log('element: ', element);
      record.findAll('opcaoQuestao', {id_questao: element.idQuestao }).subscribe(
        result => { 
          element.options = result;
          questoes.push(element); 
            $this.buildQuestoes(); 
        }); 
    });
    
  } 

  buildQuestoes(){
    let stepItems = this.stepItems
    let questoes = this.questoes;
    let formItem = [];
    let $this = this

    let finalArray = []; 
    let data = {}; 
    _.forEach( questoes, function(element) {
      console.log('element: ', element); 
      _.forEach( element.options, function(answer) {
        // console.log('answer: ', answer);
        finalArray.push( { id: answer.idOpcao, name: answer.id_questao, value: answer.idOpcao, descricao: answer.desc_opcao});
        // console.log('finalArray: ', finalArray);
        // formItem.push( { label: element.desc_questao, data: finalArray});
        // console.log('formItem: ', formItem);
        // stepItems.push( { label: element.desc_questao, data: finalArray});
      });
      // let data = newAnswer ;
      data[element.id_questao]= { type: 'radio', options: finalArray,         validations: {},errors: {}};
      // console.log('data', data);
      stepItems.push( { label: element.desc_questao, data: data});
      stepItems.push( { label: 'Review & Submit', data: {} }); 
      // console.log('stepItems: ', formItem);
      console.log('Verdadeiro: ', stepItems);
      // $this.finalFunc(formItem, stepItems);
    }) 
    this.buildFinal(); 
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
    this.formSubmit.emit(this.formData);
  }

  trackByFn(index: number): number {
    return index;
  }
}