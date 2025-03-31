import { CreateBusinessDto } from '@/modules/business/dto/CreateBusinessDto';
import { CreateUserDto } from './createUserDto';
import { IsNotEmpty } from 'class-validator';

export class CreateUserAndBusinessDto {
  @IsNotEmpty()
  user: CreateUserDto;

  @IsNotEmpty()
  business: CreateBusinessDto;
}
