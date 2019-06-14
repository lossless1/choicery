import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Errors } from '../../core/models';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CompaniesService, UserService } from '../../core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
  public typePasswordInput: string = 'password';
  public title: string = '';
  public errors: Errors = {errors: {}};
  public isSubmitting = false;
  public registerForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [
      Validators.required, Validators.minLength(3), Validators.maxLength(20)
    ]),
    companyName: new FormControl('', [
      Validators.required, Validators.minLength(2), Validators.maxLength(20)
    ]),
    email: new FormControl('', [
      Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.email
    ]),
    passwords: new FormGroup({
      password: new FormControl('',
        [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      confirmPassword: new FormControl('', [
        Validators.required, Validators.minLength(6),
        Validators.maxLength(20)
      ]),
    }, [this.passwordMatchValidator]),

    checkTerms: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private companyService: CompaniesService,
              private router: Router,
              private titleService: Title) {
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null : {mismatch: true};
  }

  get fullName() {
    return this.registerForm.get('fullName');
  }

  get companyName() {
    return this.registerForm.get('companyName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('passwords.password');
  }

  get confirmPassword() {
    return this.registerForm.get('passwords.confirmPassword');
  }

  get passwords() {
    return this.registerForm.get('passwords');
  }

  get checkTerms() {
    return this.registerForm.get('checkTerms');
  }

  isValid(prop: AbstractControl) {
    return prop.invalid && (prop.dirty || prop.touched);
  }

  ngOnInit() {
    this.titleService.setTitle('Sign Up');
  }

  public togglePasswordView() {
    if (this.typePasswordInput === 'password') {
      this.typePasswordInput = 'text';
    } else {
      this.typePasswordInput = 'password';
    }
  }

  handleError(err) {
    this.errors = err;
    this.isSubmitting = false;
  }

  public submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};
    const companyData = {name: this.companyName.value};
    const userData = {
      fullName: this.fullName.value,
      password: this.password.value,
      email: this.email.value,
    };
    this.companyService
      .save(companyData).subscribe(
      data => this.userService
        .attemptRegister({...userData, companyId: data.id})
        .subscribe(() =>
            this.router.navigateByUrl('/login'),
          err => {
            this.handleError(err);
          }),
      err => {
        this.handleError(err);
      }
    );
  }
}
