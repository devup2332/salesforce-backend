import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserWithCompanyDto } from '../dto/createUserWithCompanyDto';
import { AuthService } from '../services/auth.service';
import { LoginUserDto } from '../dto/loginUserDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registerUserWithCompany')
  async registerUserWithCompany(@Body() data: CreateUserWithCompanyDto) {
    return await this.authService.createUserWithCompany(data);
  }

  @Post('login')
  async login(@Body() data: LoginUserDto) {
    return await this.authService.loginUser(data);
  }
}
