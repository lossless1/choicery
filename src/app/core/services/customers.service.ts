import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Customer } from '../models';
import { map } from 'rxjs/operators';
import {
  CustomerResponseInterface
} from '../../admin/customers/resolve/customer.response.interface';

@Injectable()
export class CustomersService {
  constructor(
    private apiService: ApiService
  ) {
  }

  get(id: string): Observable<Customer> {
    return this.apiService.get('/customers/' + id)
      .pipe(map((data: Customer) => data));
  }

  getAll(): Observable<CustomerResponseInterface[]> {
    return this.apiService.get('/customers');
  }

  save(customer, id?): Observable<Customer> {
    // If we're updating an existing article
    if (id) {
      return this.apiService.put('/customers/' + id, {customer})
        .pipe(map(data => data.customer));

      // Otherwise, create a new article
    } else {
      return this.apiService.post('/customers/', {customer})
        .pipe(map(data => data.customer));
    }
  }

  destroy(requestId) {
    return this.apiService
      .delete(`/customers/${requestId}`);
  }
}
