import { AbstractControl, ValidatorFn } from '@angular/forms';

export function checkIdentityValidator(controlTarget: AbstractControl): ValidatorFn {
  return (control: AbstractControl) => {
    console.log(control);
    console.log(controlTarget);
    const forbidden = control.value !== controlTarget.value;
    return forbidden ? {noIdentical: {value: control.value}} : null;
  }
}
