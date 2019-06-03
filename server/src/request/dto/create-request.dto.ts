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
    companyName: string;

    @IsNotEmpty()
    @IsString()
    companyDetails: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    // @IsNotEmpty()
    // customerId: string;
}
