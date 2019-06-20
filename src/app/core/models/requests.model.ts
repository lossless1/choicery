import { Company } from './company.model';
import { Customer } from './customer.model';
import { RequestStatusEnum } from '../../shared/enums/requests.status.enum';
import { ContactDetailsPerson } from './contact.details.person';

export interface Requests {
  id: string;
  fullName: string;
  position: string;
  prospectCompany: Company;
  customer: Customer;
  company: Company;
  contactDetails: ContactDetailsPerson;
  requestState: string;
  status: RequestStatusEnum;
  note: string;
  createdAt?: Date;
  updatedAt?: Date;
}
