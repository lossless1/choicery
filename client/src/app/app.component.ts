/**
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';
import { UserService } from './core/services';

export const ROOT_SELECTOR = 'app';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: ROOT_SELECTOR,
  encapsulation: ViewEncapsulation.None,
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent implements OnInit {
  public name = 'Choicery';

  constructor(
    public appState: AppState,
    public userService: UserService
  ) {}

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
    this.userService.populate();
  }

}

/**
 * Please review the https://github.com/AngularClass/angular-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
