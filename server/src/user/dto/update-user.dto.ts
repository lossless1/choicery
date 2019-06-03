import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsOptional()
  readonly email: string;

  @IsOptional()
  readonly password: string;

  @IsOptional()
  readonly fullName: string;

  @IsOptional()
  readonly image: string;
}
