import { User } from '@prisma/client';

export interface UserRepositoryInterface {
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  createUser(data: any): Promise<string>;
  updateUser(id: string, data: any): Promise<string>;
}
