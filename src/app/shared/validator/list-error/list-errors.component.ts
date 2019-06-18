import { Component, Input } from '@angular/core';

import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-list-errors',
  styleUrls: ['./list-errors.component.css'],
  templateUrl: './list-errors.component.html'
})
export class ListErrorsComponent {
  formattedErrors: string[] = [];
  formattedServerErrors: string[] = [];

  @Input()
  control: AbstractControl;

  @Input()
  set errorsServer(errorList: ValidationErrors) {
    this.formattedServerErrors = errorList.errors.error;
  }

  get errorList() {
    return Object.keys(this.control.errors || {})
      .map(key => `${key} ${JSON.stringify(this.control.errors[key])}`);
  }

  get errorServerList() {
    return this.formattedServerErrors;
  }

  isValid(prop: AbstractControl) {
    return prop.invalid && prop.dirty && prop.touched;
  }
}
