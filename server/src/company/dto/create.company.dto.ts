import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    host: string;

    @IsNotEmpty()
    @IsString()
    portalUrl: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}
