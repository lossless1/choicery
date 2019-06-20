import { Company } from './company.model';
import { CustomerReferencePerson } from './customer.reference.model';
import { ContactDetailsPerson } from './contact.details.person';

export interface Customer {
  id: string;
  name: string;
  city: string;
  country: string;
  description: string;
  company: Company;
  referencePerson: CustomerReferencePerson;
  contactDetails: ContactDetailsPerson;
  order: number;
  crmLink: string;
  logoUrl: string;
  note: string;
  createdAt?: Date;
  updatedAt?: Date;
}
