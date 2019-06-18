import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { map, tap } from 'rxjs/operators';
import { Company, Customer } from '../models';

@Injectable()
export class CompaniesService {
  public $companies: ReplaySubject<Company> = new ReplaySubject(1);

  constructor(
    private apiService: ApiService
  ) {
  }

  get(id: string): Observable<Company> {
    return this.apiService.get('/companies/' + id)
      .pipe(tap((company) => {
        this.$companies.next(company);
      }));
  }

  getAll(): Observable<Company> {
    return this.apiService.get('/companies');
  }

  destroy(id) {
    return this.apiService.delete('/companies/' + id);
  }

  save(company, id?): Observable<Company> {
    // If we're updating an existing article
    if (id) {
      return this.apiService.put('/companies/' + id, {company})
        .pipe(tap((companies) => {
            this.$companies.next(companies);
          }));

      // Otherwise, create a new article
    } else {
      return this.apiService.post('/companies/', {company})
        .pipe(tap((companies) => {
            this.$companies.next(companies);
          }) );
    }
  }
}
