import { Injectable } from '@nestjs/common';
import { CreateBusinessDto } from '@/modules/business/dto/CreateBusinessDto';
import { BusinessRepository } from '../repositories/business.repository';

@Injectable()
export class BusinessService {
  constructor(private readonly repository: BusinessRepository) {}
  async createBusiness(data: CreateBusinessDto) {
    return await this.repository.createBusiness(data);
  }

  async findBusinessById(id: string) {
    return this.repository.findBusinessById(id);
  }
}
