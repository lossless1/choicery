import { CustomerReferencePerson } from './model/customer.reference.person';
import { CompanyInterface } from '../company/company.interface';

export interface CustomerInterface {
    id: string;
    fullName: string
    email: string;
    position: string;
    city: string;
    country: string;
    description: string;
    company: CompanyInterface;
    referencePerson: CustomerReferencePerson;
    contactDetails: string;
    order: number;
    createdAt?: Date;
    updatedAt?: Date;
}
