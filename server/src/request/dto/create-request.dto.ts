import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateRequestDto {
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsNotEmpty()
    @IsString()
    position: string;

    @IsNotEmpty()
    @IsString()
    prospectCompany: string;

    @IsNotEmpty()
    @IsString()
    contacts: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    website: string;

    @IsNotEmpty()
    customerId: string;

    @IsNotEmpty()
    companyId: string;
}
