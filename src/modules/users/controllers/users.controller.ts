import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '@/modules/users/dto/createUserDto';
import { UsersService } from '@/modules/users/services/users.service';
import { CreateUserAndBusinessDto } from '@/modules/users/dto/createUserAndBusinessDto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Post('businessAndUser')
  createUserAndBusiness(@Body() data: CreateUserAndBusinessDto) {
    return this.userService.createUserAndBusiness(data);
  }

  @Get('validateEmailExist/:email')
  async validateEmailExist(@Param('email') email: string) {
    const user = await this.userService.validateEmailExist(email);
    return { user };
  }
}
