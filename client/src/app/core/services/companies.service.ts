import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Company } from '../models';

@Injectable()
export class CompaniesService {
  constructor (
    private apiService: ApiService
  ) {}

  get(id): Observable<Company> {
    return this.apiService.get('/companies/' + id)
      .pipe(map(data => data.company));
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
        .pipe(map(data => data.company));

    // Otherwise, create a new article
    } else {
      return this.apiService.post('/companies/', {company})
        .pipe(map(data => data.company));
    }
  }

}
