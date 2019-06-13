import { Component, Input } from '@angular/core';

import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-list-errors',
  styleUrls: ['./list-errors.component.css'],
  templateUrl: './list-errors.component.html'
})
export class ListErrorsComponent {
  formattedErrors: string[] = [];

  @Input()
  set errors(errorList: ValidationErrors) {
    console.log(errorList);
    this.formattedErrors = Object.keys(errorList.errors || {})
      .map(key => `${key} ${errorList.errors[key]}`);
  }

  get errorList() { return this.formattedErrors; }


}
