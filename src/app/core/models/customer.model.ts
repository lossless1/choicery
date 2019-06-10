import { Company } from './company.model';
import { CustomerReferencePerson } from './customer.reference.model';
import { CustomerContactDetailsPerson } from './customer.contact.details.person';

export interface Customer {
  id: string;
  name: string;
  city: string;
  country: string;
  description: string;
  company: Company;
  referencePerson: CustomerReferencePerson;
  contactDetails: CustomerContactDetailsPerson;
  order: number;
  crmLink: string;
  createdAt?: Date;
  updatedAt?: Date;
}
