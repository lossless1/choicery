import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Company, Errors } from '../../core/models';
import { UserService } from '../../core/services';
import { Title } from '@angular/platform-browser';
import ValidatorUtils from '../../shared/validator/validator.utils';

@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'login'.
   */
  selector: 'login',  // <login></login>
  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler.
   */
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public typePasswordInput: string = 'password';
  public title: string = '';
  public errors: Errors = {errors: {}};
  public isSubmitting = false;
  public authForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.email
    ]),
    password: new FormControl('', [
      Validators.required, Validators.minLength(6), Validators.maxLength(20),
    ]),
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private titleService: Title
  ) {
  }

  public ngOnInit() {
    this.titleService.setTitle('Login');
  }

  public togglePasswordView() {
    if (this.typePasswordInput === 'password') {
      this.typePasswordInput = 'text';
    } else {
      this.typePasswordInput = 'password';
    }
  }

  getControl(controlName): AbstractControl {
    return this.authForm.get(controlName);
  }

  isFieldValid(field: string) {
    return (!this.authForm.get(field).valid && this.authForm.get(field).touched) ||
      (this.authForm.get(field).untouched && this.isSubmitting);
  }

  public submitForm() {
    console.log(this.errors);
    this.isSubmitting = true;
    if (this.authForm.valid) {
      this.errors = {errors: {}};
      this.userService
        .attemptAuth(this.authForm.value)
        .subscribe(
          data => this.router.navigateByUrl('/admin/requests'),
          err => {
            this.errors = err;
            this.isSubmitting = false;
          }
        );
    } else {
      ValidatorUtils.validateAllFormFields(this.authForm);
    }
  }
}
