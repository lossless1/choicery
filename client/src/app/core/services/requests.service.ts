import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Request } from '../models';

@Injectable()
export class RequestsService {
  constructor(
    private apiService: ApiService
  ) {
  }

  add(payload): Observable<Request> {
    return this.apiService
      .post(
        `/requests`,
        {comment: {body: payload}}
      ).pipe(map(data => data.request));
  }

  getAll(): Observable<Request[]> {
    return this.apiService.get(`/requests`)
      .pipe(map(data => data.request));
  }

  save(request, id?): Observable<Request> {
    // If we're updating an existing article
    if (id) {
      return this.apiService.put('/requests/' + id, {request})
        .pipe(map(data => data.request));

      // Otherwise, create a new article
    } else {
      return this.apiService.post('/requests/', {request})
        .pipe(map(data => data.request));
    }
  }

  destroy(requestId) {
    return this.apiService
      .delete(`/requests/${requestId}`);
  }

}
