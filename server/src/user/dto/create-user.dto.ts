import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    readonly fullName: string;
    @IsNotEmpty()
    readonly username: string;
    @IsNotEmpty()
    readonly email: string;
    @IsNotEmpty()
    readonly position: string;
    @IsNotEmpty()
    readonly password: string;
}
