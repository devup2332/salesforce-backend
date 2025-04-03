import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { UsersService } from '@/modules/users/services/users.service';
import { UsersController } from '@/modules/users/controllers/users.controller';
import { BusinessModule } from '@/modules/business/business.module';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [PrismaModule, BusinessModule],
  providers: [UsersService, UserRepository],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
