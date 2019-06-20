import { Component, OnInit } from '@angular/core';
import { Company, Customer, Errors, Requests } from '../../core/models';
import { CompaniesService, CustomersService, RequestsService } from '../../core/services';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RequestStatusEnum } from '../../shared/enums/requests.status.enum';
import { STATUSES } from '../../shared/constants/request.statuses';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import ValidatorUtils from '../../shared/validator/validator.utils';

@Component({
  selector: 'requests',
  templateUrl: 'requests.component.html'
})
export class RequestsComponent implements OnInit {
  public requests: Requests[] = [];
  public customers: Customer[];
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
  }, {updateOn: 'change'});

  constructor(private readonly requestsService: RequestsService,
              private readonly customerService: CustomersService,
              private readonly companyService: CompaniesService,
              private readonly titleService: Title,
              private modalService: NgbModal) {
  }

  async ngOnInit() {
    this.titleService.setTitle('Requests');
    this.requests = await this.requestsService.getAll().toPromise();
    this.customers = await this.customerService.getAll().toPromise();
  }

  get newRequests() {
    return this.requests.filter(request => request.status === RequestStatusEnum.TOBEDONE).length;
  }

  getControl(controlName): AbstractControl {
    return this.requestForm.get(controlName);
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

  isFieldValid(field: string) {
    return (!this.requestForm.get(field).valid && this.requestForm.get(field).touched) ||
      (this.requestForm.get(field).untouched && this.isSubmitting);
  }

  reset() {
    this.requestForm.reset();
    this.isSubmitting = false;
  }

  closeModal(modal) {
    this.reset();
    modal.close();
  }

  createRequest(modal) {
    this.isSubmitting = true;

    if (this.requestForm.valid) {
      this.errors = {errors: {}};
      this.companyService.$company.subscribe((company: Company) => {
        const requestData = {
          ...this.requestForm.value,
          companyId: company.id,
        };
        this.requestsService
          .save(requestData).subscribe(
          async (data) => {
            this.reset();
            await this.refreshList();
            this.requestForm.reset();
            modal.close();
          },
          err => {
            this.handleError(err);
          });
      });
    } else {
      ValidatorUtils.validateAllFormFields(this.requestForm);
    }
  }
}
