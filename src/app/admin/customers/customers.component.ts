import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../core/services';
import { Customer } from '../../core/models';

@Component({
  selector: 'customers',
  templateUrl: 'customers.component.html'
})

export class CustomersComponent implements OnInit {
  customers: Customer[] = [];

  constructor(private readonly customersService: CustomersService) {
  }

  public ngOnInit() {
    this.customersService.getAll().subscribe((customers) => {
      this.customers = customers;
    });
    //

  }

  async refreshList() {
    this.customers = await this.customersService.getAll().toPromise();
  }
}
