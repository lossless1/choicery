import { Component, OnInit } from '@angular/core';
import { Customer, Errors, Request } from '../../core/models';
import { CustomersService, RequestsService } from '../../core/services';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'requests',
  templateUrl: 'requests.component.html'
})

export class RequestsComponent implements OnInit {
  requests: Request[];
  customers: Customer[];

  public errors: Errors = {errors: {}};
  public isSubmitting = false;
  public requestForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.email
    ]),
    password: new FormControl('', [
      Validators.required, Validators.minLength(2), Validators.maxLength(20),
    ]),
  });

  constructor(private readonly requestsService: RequestsService,
              private readonly customerService: CustomersService) {
  }

  get newRequests() {
    return this.requests.filter(request => request.status === 'todo').length
  }

  async ngOnInit() {
    this.requests = await this.requestsService.getAll().toPromise();
    this.customers = await this.customerService.getAll().toPromise();
  }

  async select(el, index) {
    const currentStatus = el.getAttribute('data-select');
    const currentRequest = this.requests[index];
    await this.requestsService.save(
      {...currentRequest, status: currentStatus},
      this.requests[index].id).toPromise();
  }

  async delete(index) {
    this.requestsService.destroy(
      this.requests[index].id).subscribe(() => {
      this.requests.splice(index, 1);
    }, (error) => {
      console.log(error);
    });
  }

  async createRequest() {

  }
}
