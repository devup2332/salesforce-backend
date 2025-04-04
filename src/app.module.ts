import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@/prisma/prisma.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { UsersModule } from '@/modules/users/users.module';
import { BusinessModule } from '@/modules/business/business.module';
import { CommonModule } from './modules/common/common.module';

const developMode = process.env.NODE_ENV === 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: developMode ? '.env.local' : '.env',
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    BusinessModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
