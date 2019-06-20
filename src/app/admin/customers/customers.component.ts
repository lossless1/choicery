import { Component, OnInit } from '@angular/core';
import { CompaniesService, CustomersService, RequestsService } from '../../core/services';
import { Company, Customer, Errors } from '../../core/models';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import ValidatorUtils from '../../shared/validator/validator.utils';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'customers',
  templateUrl: 'customers.component.html'
})

export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  isSubmitting: boolean = false;
  customersForm: FormGroup = new FormGroup({
    name: new FormControl('testname', [
      Validators.required, Validators.minLength(3), Validators.maxLength(40)
    ]),
    city: new FormControl('city', [
      Validators.required, Validators.minLength(3), Validators.maxLength(40)
    ]),
    country: new FormControl('country', [
      Validators.required, Validators.minLength(3), Validators.maxLength(40)
    ]),
    note: new FormControl('note', [
      Validators.required, Validators.minLength(2), Validators.maxLength(40)
    ]),
    crmLink: new FormControl('crmlink111', [
      Validators.required, Validators.minLength(7), Validators.maxLength(40)
    ]),
    companyLogo: new FormControl('', []),
    referencePersonFullName: new FormControl('fullname', [
      Validators.required, Validators.minLength(2), Validators.maxLength(40)
    ]),
    referencePersonEmail: new FormControl('referenceperson', [
      Validators.required, Validators.minLength(5), Validators.maxLength(40),
      Validators.email
    ]),
    referencePersonPhoto: new FormControl('', []),
    referencePersonPosition: new FormControl('referencepersonpos', [
      Validators.minLength(3), Validators.maxLength(40)
    ]),
    contactDetails: new FormControl('contacts', [
      Validators.required, Validators.minLength(2), Validators.maxLength(40)
    ]),

  }, {updateOn: 'change'});
  public errors: Errors = {errors: {}};

  constructor(private readonly customersService: CustomersService,
              private readonly companyService: CompaniesService,
              private readonly titleService: Title,
              private modalService: NgbModal) {
  }

  public async ngOnInit() {
    this.titleService.setTitle('Customers');
    this.customers = await this.customersService.getAll().toPromise();
  }

  getContactDetails(customer) {
    let text = '';
    Object.keys(customer.contactDetails).forEach((key) => {
      text += `${key}: ${customer.contactDetails[key]}, `;
    });
    return text;
  }

  async refreshList() {
    this.customers = await this.customersService.getAll().toPromise();
  }

  open(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-customers-title',
      centered: true,
      size: 'lg'
    });
  }

  reset() {
    this.customersForm.reset();
    this.isSubmitting = false;
  }

  handleError(err) {
    this.errors = err;
    this.isSubmitting = false;
  }

  getControl(controlName): AbstractControl {
    return this.customersForm.get(controlName);
  }

  closeModal(modal) {
    this.reset();
    modal.close();
  }

  createCustomer(modal) {
    this.isSubmitting = true;
    if (this.customersForm.valid) {
      this.errors = {errors: {}};
      this.companyService.$company.subscribe((company: Company) => {
        const requestData = {
          ...this.customersForm.value,
          companyId: company.id,
        };
        this.customersService
          .save(requestData).subscribe(
          async () => {
            this.reset();
            await this.refreshList();
            this.customersForm.reset();
            modal.close();
          },
          err => {
            this.handleError(err);
          });
      });
    } else {
      ValidatorUtils.validateAllFormFields(this.customersForm);
    }
  }
}
