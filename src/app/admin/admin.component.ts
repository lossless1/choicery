import { Component, OnInit } from '@angular/core';
import { User } from '../core/models';
import { UserService } from '../core/services';

@Component({
  selector: 'admin',
  templateUrl: 'admin.component.html'
})

export class AdminComponent implements OnInit {

  currentUser: User;
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );
  }
}
