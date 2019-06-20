import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CompaniesService, CustomersService } from '../../core/services';
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
    companyLogo: new FormControl(null, []),
    referencePersonFullName: new FormControl('fullname', [
      Validators.required, Validators.minLength(2), Validators.maxLength(40)
    ]),
    referencePersonEmail: new FormControl('referenceperson@awdawd.com', [
      Validators.required, Validators.minLength(5), Validators.maxLength(40),
      Validators.email
    ]),
    referencePersonPhoto: new FormControl(null, []),
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
              private modalService: NgbModal,
              private cd: ChangeDetectorRef) {
  }

  public async ngOnInit() {
    this.titleService.setTitle('Customers');
    this.customers = await this.customersService.getAll().toPromise();
  }

  getFileName(event) {
    const files = event.files;
    if (event.files.length) {
      return files[0] && files[0].name;
    } else {
      return 'Choose a file…';
    }
  }

  onFileChange(event, controlName) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = (a) => {
        console.log(a);
        this.customersForm.patchValue({[controlName]: file});
      };
    }
  }

  prepareSave(): FormData {
    const input = new FormData();
    Object.keys(this.customersForm.value).forEach((key) => {
      input.append(key, this.customersForm.get(key).value);
    });
    return input;
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
    const formData: FormData = this.prepareSave();

    this.isSubmitting = true;
    if (this.customersForm.valid) {
      this.errors = {errors: {}};
      this.companyService.$company.subscribe((company: Company) => {
        const requestData = {
          ...this.customersForm.value,
          companyId: company.id,
        };
        formData.append('companyId', company.id);
        console.log(formData.get('companyId'));

        const photo = new FormData();
        photo.append('companyLogo', this.customersForm.get('companyLogo').value);
        this.customersService
          .save(photo).subscribe(
          async () => {
            await this.refreshList();
            // this.reset();`
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
