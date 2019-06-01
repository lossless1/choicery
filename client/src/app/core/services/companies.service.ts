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

  get(slug): Observable<Company> {
    return this.apiService.get('/companies/' + slug)
      .pipe(map(data => data.company));
  }

  getAll(username: string): Observable<Company> {
    return this.apiService.get('/companies');
  }

  destroy(slug) {
    return this.apiService.delete('/companies/' + slug);
  }

  save(company, slug?): Observable<Company> {
    // If we're updating an existing article
    if (slug) {
      return this.apiService.put('/companies/' + slug, {company})
        .pipe(map(data => data.company));

    // Otherwise, create a new article
    } else {
      return this.apiService.post('/companies/', {company})
        .pipe(map(data => data.company));
    }
  }

}
