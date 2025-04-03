import { Module } from '@nestjs/common';
import { AuthService } from '@/modules/auth/services/auth.service';
import { AuthController } from '@/modules/auth/controllers/auth.controller';
import { UsersModule } from '../users/users.module';
import { BusinessModule } from '../business/business.module';

@Module({
  imports: [UsersModule, BusinessModule],
  exports: [AuthService],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
