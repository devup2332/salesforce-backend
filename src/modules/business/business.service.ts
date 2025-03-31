import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateBusinessDto } from '@/modules/business/dto/CreateBusinessDto';

@Injectable()
export class BusinessService {
  constructor(private prisma: PrismaService) {}
  async createBusiness(business: CreateBusinessDto) {
    return await this.prisma.business.create({
      data: {
        name: business.name,
        description: business.description,
        imageUrl: business.imageUrl,
        creatorId: business.creatorId,
      },
    });
  }
}
