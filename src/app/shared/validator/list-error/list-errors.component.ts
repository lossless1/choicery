import { Component, Input } from '@angular/core';

import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-list-errors',
  styleUrls: ['./list-errors.component.css'],
  templateUrl: './list-errors.component.html'
})
export class ListErrorsComponent {
  formattedErrors: string[] = [];
  formattedServerErrors: string[];

  @Input()
  control: AbstractControl;

  @Input()
  isSubmitting: boolean;

  @Input()
  set errorsServer(errorList: ValidationErrors) {
    this.formattedServerErrors = errorList.errors;
  }

  get errorList() {
    return Object.keys(this.control.errors || {})
      .map(key => `${key} ${JSON.stringify(this.control.errors[key])}`);
  }

  get errorServerList() {
    return this.formattedServerErrors;
  }

  isFieldValid() {
    return (!this.control.valid && this.control.touched) ||
      (this.control.untouched && this.isSubmitting);
  }
}
