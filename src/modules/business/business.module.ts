import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BusinessService } from './services/business.service';
import { BusinessController } from './controllers/business.controller';
import { BusinessRepository } from './repositories/business.repository';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [PrismaModule, CommonModule],
  exports: [BusinessService],
  providers: [BusinessService, BusinessRepository],
  controllers: [BusinessController],
})
export class BusinessModule {}
