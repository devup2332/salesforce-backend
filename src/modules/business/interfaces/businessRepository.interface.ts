import { Business } from '@prisma/client';
import { CreateBusinessDto } from '../dto/CreateBusinessDto';

export interface BusinessRepositoryInterface {
  findBusinessById(id: string): Promise<Business | null>;
  createBusiness(data: CreateBusinessDto): Promise<string>;
}
