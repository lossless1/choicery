import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Requests } from '../models';
import { RequestResponseInterface } from '../../admin/requests/resolve/request.response.interface';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable()
export class RequestsService {
  public $allRequests: ReplaySubject<Requests[]> = new ReplaySubject(1);

  constructor(
    private apiService: ApiService
  ) {
  }

  add(payload): Observable<Requests> {
    return this.apiService
      .post(
        `/requests`,
        {payload}
      ).pipe(map(data => data.requests));
  }

  getAll(): Observable<Requests[]> {
    return this.apiService.get(`/requests`)
      .pipe(
        map(data => data.requests),
        tap(data => this.$allRequests.next(data))
      );
  }

  get(id) {
    return this.apiService
      .get(
        `/requests`,
        id
      );
  }

  save(request, id?): Observable<Requests> {
    // If we're updating an existing article
    if (id) {
      return this.apiService.put('/requests/' + id, {request});

      // Otherwise, create a new article
    } else {
      return this.apiService.post('/requests/', {request})
        .pipe(map(data => data.requests));
    }
  }

  destroy(requestId) {
    return this.apiService
      .delete(`/requests/${requestId}`)
      .pipe(tap(() => this.getAll()));
  }

}
