import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../core/services';
import { User } from '../../core/models';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {

  currentUser: User;
  constructor(public readonly router: Router,
              public readonly userService: UserService) {
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigate(['login']);
  }
}
