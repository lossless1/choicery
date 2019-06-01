import { ReferencePerson } from './model/reference.person';

interface CustomerInterface {
    id: string;
    fullName: string
    email: string;
    position: string;
    city: string;
    country: string;
    description: string;
    company: Company;
    referencePerson: ReferencePerson;
    contactDetails: string;
    order: number;
    createdAt?: Date;
    updatedAt?: Date;
}
