import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '@/modules/users/dto/createUserDto';
import { BusinessService } from '@/modules/business/business.service';
import { CreateUserAndBusinessDto } from '@/modules/users/dto/createUserAndBusinessDto';
import { AuthService } from '@/modules/auth/auth.service';
import { UserRepository } from '@/modules/users/repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private businessService: BusinessService,
    private authService: AuthService,
    private repository: UserRepository,
  ) {}

  async createUser(user: CreateUserDto) {
    const userDB = await this.validateEmailExist(user.email);
    if (userDB) {
      throw new HttpException(
        'Email is already in use',
        HttpStatus.BAD_REQUEST,
      );
    }
    const {
      data: { user: userSupabase },
    } = await this.authService.createUserSupabase({
      email: user.email,
      password: user.password,
    });
    if (!userSupabase) {
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }

    return await this.repository.createUser(user);
  }

  async createUserAndBusiness({ user, business }: CreateUserAndBusinessDto) {
    const newUserId = await this.createUser(user);
    const newBusiness = await this.businessService.createBusiness({
      imageUrl: business.imageUrl,
      name: business.name,
      description: business.description,
      creatorId: newUserId,
    });

    return { user: newUserId, business: newBusiness };
  }

  async validateEmailExist(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
