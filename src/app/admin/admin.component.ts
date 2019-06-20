import { Component, OnInit } from '@angular/core';
import { User } from '../core/models';
import { CompaniesService, UserService } from '../core/services';

@Component({
  selector: 'admin',
  templateUrl: 'admin.component.html'
})

export class AdminComponent implements OnInit {

  currentUser: User;

  constructor(private userService: UserService, private companyService: CompaniesService) {
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(
      async (userData) => {
        this.currentUser = userData;
        if (Object.keys(this.currentUser).length) {
          await this.companyService.get(this.currentUser.companyId).toPromise();
        }
      }
    );
  }
}
