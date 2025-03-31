import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [BusinessService],
  providers: [BusinessService],
  controllers: [BusinessController],
})
export class BusinessModule {}
