import { Component, OnInit } from '@angular/core';
import { Company, Customer, Errors, Requests } from '../../core/models';
import { CompaniesService, CustomersService, RequestsService } from '../../core/services';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RequestStatusEnum } from '../../shared/enums/requests.status.enum';
import { STATUSES } from '../../shared/constants/request.statuses';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'requests',
  templateUrl: 'requests.component.html'
})
export class RequestsComponent implements OnInit {
  requests: Requests[] = [];
  customers: Customer[];
  public statuses = STATUSES;
  public errors: Errors = {errors: {}};
  public isSubmitting = false;
  public requestForm: FormGroup = new FormGroup({
    companyName: new FormControl('', [
      Validators.required, Validators.minLength(3), Validators.maxLength(40)
    ]),
    companyWebsite: new FormControl('', [
      Validators.required, Validators.minLength(7), Validators.maxLength(40)
    ]),
    fullName: new FormControl('', [
      Validators.required, Validators.minLength(2), Validators.maxLength(20),
    ]),
    position: new FormControl('', [
      Validators.required, Validators.minLength(2), Validators.maxLength(20),
    ]),
    note: new FormControl('', [Validators.minLength(5), Validators.maxLength(30),
    ]),
    contacts: new FormControl('', [Validators.minLength(1), Validators.maxLength(40),
    ]),
    customerId: new FormControl('', [
      Validators.required, Validators.minLength(1), Validators.maxLength(40),
    ]),
    status: new FormControl('', [
      Validators.required, Validators.minLength(1), Validators.maxLength(40),
    ]),
    description: new FormControl('', [Validators.minLength(2), Validators.maxLength(200),
    ]),
  }, {updateOn: 'submit'});

  constructor(private readonly requestsService: RequestsService,
              private readonly customerService: CustomersService,
              private readonly companyService: CompaniesService,
              private readonly titleService: Title,
              private modalService: NgbModal) {
  }

  getControl(controlName): AbstractControl {
    return this.requestForm.get(controlName);
  }

  get newRequests() {
    return this.requests.filter(request => request.status === RequestStatusEnum.TOBEDONE).length;
  }

  async ngOnInit() {
    this.titleService.setTitle('Requests');
    this.requests = await this.requestsService.getAll().toPromise();
    this.customers = await this.customerService.getAll().toPromise();
  }

  open(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-request-title',
      centered: true,
      size: 'lg'
    });
  }

  async select(el, index) {
    const currentStatus = el.getAttribute('data-select');
    const data = {status: currentStatus};
    await this.update(data, index);
  }

  async update(data, index) {
    try {
      const request = await this.requestsService
        .save(data, this.requests[index].id).toPromise();
      this.requests[index].status = request.status;
    } catch (e) {
      console.error(e);
    }
  }

  async delete(index) {
    this.requestsService.destroy(
      this.requests[index].id).subscribe(() => {
      this.requests.splice(index, 1);
    });
  }

  async refreshList() {
    this.requests = await this.requestsService.getAll().toPromise();
  }

  handleError(err) {
    this.errors = err;
    this.isSubmitting = false;
  }

  createRequest(modal) {
    this.isSubmitting = true;
    this.errors = {errors: {}};
    this.companyService.$companies.subscribe((company: Company) => {
      console.log(company);
      const requestData = {
        ...this.requestForm.value,
        companyId: company.id,
      };
      console.log(this.getControl('customerId').value);
      console.log(requestData);
      console.log(this.requestForm);
      // this.requestsService
      //   .save(requestData).subscribe(
      //   async (data) => {
      //     this.isSubmitting = false;
      //     console.log(data);
      //     await this.refreshList();
      //     this.requestForm.reset()
      //     modal.close();
      //   },
      //   err => {
      //     this.handleError(err);
      //   }
      // );
    });

  }
}
