import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../core/services';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
  constructor(public readonly router: Router,
              public readonly userService: UserService) {
  }

  ngOnInit() {
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigate(['login']);
  }
}
