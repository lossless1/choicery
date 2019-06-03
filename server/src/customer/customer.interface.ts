import { ReferencePerson } from './model/reference.person';

export interface CustomerInterface {
    id: string;
    fullName: string
    email: string;
    position: string;
    city: string;
    country: string;
    description: string;
    company: CompanyInterface;
    referencePerson: ReferencePerson;
    contactDetails: string;
    order: number;
    createdAt?: Date;
    updatedAt?: Date;
}
