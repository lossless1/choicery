import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Customer } from '../models';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class CustomersService {
  public $customers: BehaviorSubject<Customer[]> = new BehaviorSubject([]);

  constructor(
    private apiService: ApiService
  ) {
  }

  get(id: string): Observable<Customer> {
    return this.apiService.get('/customers/' + id)
      .pipe(map(data => data.customers));
  }

  getAll(): Observable<Customer[]> {
    return this.apiService.get('/customers')
      .pipe(map(data => data.customers),
        tap((customers) => {
          this.$customers.next(customers);
        }));
  }

  save(customer, id?): Observable<Customer> {
    // If we're updating an existing article
    if (id) {
      return this.apiService.put('/customers/' + id, customer)
        .pipe(map(data => data.customers));

      // Otherwise, create a new article
    } else {
      return this.apiService.postFormData('/customers', customer);
    }
  }

  destroy(requestId) {
    return this.apiService
      .delete(`/customers/${requestId}`);
  }
}
