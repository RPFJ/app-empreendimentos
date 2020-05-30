
import { Component, OnInit } from '@angular/core';

import { STEP_ITEMS } from './multi-step-form';

@Component({
  templateUrl: './evolucao.component.html'
})
export class EvolucaoComponent implements OnInit  {
  formContent: any;
  formData: any;
  activeStepIndex: number;

  ngOnInit(): void {
    this.formContent = STEP_ITEMS;
    this.formData = {};
  }

  onFormSubmit(formData: any): void {
    this.formData = formData;

    // post form data here
    alert(JSON.stringify(this.formData));
  }
}