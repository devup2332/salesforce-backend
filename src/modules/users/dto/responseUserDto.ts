import { User } from '@prisma/client';

export class ResponseUserDto {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  imageUrl: string | null;

  constructor(user: User) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.id = user.id;
    this.imageUrl = user.imageUrl;
  }
}
