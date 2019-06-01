import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Company, Customer } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class CustomersService {
  constructor (
    private apiService: ApiService
  ) {}

  get(username: string): Observable<Customer> {
    return this.apiService.get('/customers/' + username)
      .pipe(map((data: {profile: Customer}) => data));
  }

  getAll(username: string): Observable<Customer> {
    return this.apiService.get('/customers');
  }

  save(customer, slug?): Observable<Customer> {
    // If we're updating an existing article
    if (slug) {
      return this.apiService.put('/customers/' + slug, {customer})
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
