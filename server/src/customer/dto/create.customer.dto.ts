import { IsNotEmpty } from 'class-validator';

export class CreateCustomerDto{
    @IsNotEmpty()
    fullName: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    position: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    country: string;

    @IsNotEmpty()
    description: string;

    //TODO
    // @IsNotEmpty()
    // companyId: string;

    //TODO
    // @IsNotEmpty()
    // referencePerson: ReferencePerson;

    @IsNotEmpty()
    contactDetails: string;

}
