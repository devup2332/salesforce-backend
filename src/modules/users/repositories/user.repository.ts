import { PrismaService } from '@/prisma/prisma.service';
import { CreateUserDto } from '@/modules/users/dto/createUserDto';
import { UserRepositoryInterface } from '../interfaces/userRepository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async findUserById(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(data: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        lastName: data.lastName,
        firstName: data.firstName,
        imageUrl: data.imageUrl,
      },
    });
    return user.id;
  }

  async updateUser(id: string, data: CreateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        email: data.email,
        lastName: data.lastName,
        firstName: data.firstName,
        imageUrl: data.imageUrl,
      },
    });
    return user.id;
  }
}
