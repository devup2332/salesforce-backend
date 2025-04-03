import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@/modules/users/dto/createUserDto';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { HttpResponseDto } from '@/modules/auth/dto/httpResponseDto';

@Injectable()
export class UsersService {
  constructor(private repository: UserRepository) {}

  async createUser(user: CreateUserDto) {
    const userDB = await this.validateEmailExist(user.email);
    if (userDB) {
      throw new HttpException(
        'Email is already in use',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.repository.createUser(user);
  }

  async validateEmailExist(email: string) {
    return await this.repository.findUserByEmail(email);
  }

  async findUserByEmail(email: string) {
    return this.repository.findUserByEmail(email);
  }

  async findUserById(id: string) {
    const user = await this.repository.findUserById(id);
    return new HttpResponseDto(HttpStatus.OK, 'User Found', user);
  }
}
