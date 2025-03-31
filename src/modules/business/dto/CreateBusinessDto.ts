import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateBusinessDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  creatorId: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
