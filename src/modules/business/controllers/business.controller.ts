import { Controller, Get, Param } from '@nestjs/common';
import { BusinessService } from '../services/business.service';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get(':id')
  findBusinessById(@Param('id') id: string) {
    return this.businessService.findBusinessById(id);
  }
}
