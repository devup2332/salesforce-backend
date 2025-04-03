import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserWithCompanyDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  businessName: string;

  @IsNotEmpty()
  password: string;
}
