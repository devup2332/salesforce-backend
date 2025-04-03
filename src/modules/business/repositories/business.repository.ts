import { PrismaService } from '@/prisma/prisma.service';
import { CreateBusinessDto } from '../dto/CreateBusinessDto';
import { BusinessRepositoryInterface } from '../interfaces/businessRepository.interface';
import { Injectable } from '@nestjs/common';
import { CommonService } from '@/modules/common/common.service';

@Injectable()
export class BusinessRepository implements BusinessRepositoryInterface {
  constructor(
    private readonly prisma: PrismaService,
    private readonly commonService: CommonService,
  ) {}

  async createBusiness(data: CreateBusinessDto) {
    const businessId = this.commonService.generateUUID();
    const newBusiness = await this.prisma.business.create({
      data: {
        id: businessId,
        name: data.name,
        description: data.description,
        creatorId: data.creatorId,
        imageUrl: data.imageUrl,
      },
    });
    return newBusiness.id;
  }

  async findBusinessById(id: string) {
    return await this.prisma.business.findUnique({
      where: { id },
    });
  }
}
