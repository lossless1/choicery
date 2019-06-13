import { Component, OnInit } from '@angular/core';
import { Customer, Errors } from '../../../core/models';

@Component({
  selector: 'details-requests',
  templateUrl: 'details.requests.component.html'
})

export class DetailsRequestsComponent implements OnInit {
  requests: Request[] = [];
  customers: Customer[];

  public errors: Errors = {errors: {}};
  public isSubmitting = false;

  constructor() {
  }

  ngOnInit(): void {
  }
}
