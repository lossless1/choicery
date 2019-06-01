import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.service';
import { Router } from '@angular/router';

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

  constructor(
    public appState: AppState,
  ) {
  }

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }
}
