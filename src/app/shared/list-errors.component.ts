import { Component, Input } from '@angular/core';

import { ValidationErrors } from '@angular/forms';
import { ListErrorsEnums } from './enums/list-errors.enums';

@Component({
  selector: 'app-list-errors',
  styleUrls: ['./list-errors.component.css'],
  templateUrl: './list-errors.component.html'
})
export class ListErrorsComponent {
  formattedErrors: string[] = [];

  @Input()
  set errors(errorList: ValidationErrors) {
    this.formattedErrors = Object.keys(errorList.errors || {})
      .map(key => `${ListErrorsEnums[key]}}`);
  }

  get errorList() {
    console.log(this.formattedErrors);
    return this.formattedErrors;
  }
}
