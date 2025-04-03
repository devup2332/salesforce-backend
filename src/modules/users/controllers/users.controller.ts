import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '@/modules/users/dto/createUserDto';
import { UsersService } from '@/modules/users/services/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Get('validateEmailExist/:email')
  async validateEmailExist(@Param('email') email: string) {
    const user = await this.userService.validateEmailExist(email);
    return { user };
  }

  @Get('findUserById/:id')
  async getUserById(@Param('id') id: string) {
    return await this.userService.findUserById(id);
  }
}
