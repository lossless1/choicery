import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Errors } from '../../core/models';
import { UserService } from '../../core/services';

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
      Validators.required, Validators.minLength(2), Validators.maxLength(20),
    ]),
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
  }

  public ngOnInit() {
    // console.log('Initial App State', this.appState.state);
  }

  public togglePasswordView() {
    if (this.typePasswordInput === 'password') {
      this.typePasswordInput = 'text';
    } else {
      this.typePasswordInput = 'password';
    }
  }

  public submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};

    const credentials = {...this.authForm.value, companyId: '123'};
    this.userService
      .attemptAuth(credentials)
      .subscribe(
        data => this.router.navigateByUrl('/admin/requests'),
        err => {
          console.log(err);
          this.errors = err;
          this.isSubmitting = false;
        }
      );
  }
}
