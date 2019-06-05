import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../core/services';
import { Customer } from '../../core/models';

@Component({
  selector: 'customers',
  templateUrl: 'customers.component.html'
})

export class CustomersComponent implements OnInit {
  customers: Customer[];

  constructor(private readonly customersService: CustomersService) {
  }

  public async ngOnInit() {
    this.customers = (await this.customersService.getAll().toPromise()).customers;
    console.log(this.customers);
  }
}
