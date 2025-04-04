import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import {
  createClient,
  FunctionsHttpError,
  SupabaseClient,
} from '@supabase/supabase-js';
import { env } from 'src/config/env';
import { CreateUserDto } from '@/modules/auth/dto/createUserSupabaseDto';
import { CreateUserWithCompanyDto } from '../dto/createUserWithCompanyDto';
import { UsersService } from '@/modules/users/services/users.service';
import { BusinessService } from '@/modules/business/services/business.service';
import { HttpResponseDto } from '../dto/httpResponseDto';
import { LoginUserDto } from '../dto/loginUserDto';

@Injectable()
export class AuthService implements OnModuleInit {
  supabaseClient: SupabaseClient;
  readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UsersService,
    private readonly businessService: BusinessService,
  ) {}

  onModuleInit() {
    if (this.supabaseClient) return;
    this.supabaseClient = createClient(env.SUPABASE_URL, env.SUPABASE_NEON_KEY);
  }

  async createUserSupabase({ email, password }: CreateUserDto) {
    return await this.supabaseClient.auth.signUp({
      email,
      password,
    });
  }

  async createUserWithCompany(data: CreateUserWithCompanyDto) {
    // Creating user in Supabase
    const {
      data: { user: userSupabase, session },
      error,
    } = await this.createUserSupabase({
      password: data.password,
      email: data.email,
    });

    this.logger.log('User created in Supabase');

    if (!userSupabase) {
      return new HttpResponseDto(
        HttpStatus.BAD_REQUEST,
        error?.message || "Couldn't create user in Supabase",
        null,
      );
    }

    // Creating user in our database
    const newUserId = await this.userService.createUser({
      id: userSupabase.id,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    });
    this.logger.log('User created in Database');

    await this.businessService.createBusiness({
      name: data.businessName,
      creatorId: newUserId,
    });

    return new HttpResponseDto(HttpStatus.OK, 'User created successfully', {
      accessToken: session?.access_token,
      refreshToken: session?.refresh_token,
      profile: {
        id: newUserId,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });
  }

  async loginUser(data: LoginUserDto) {
    try {
      const {
        data: { user, session },
        error,
      } = await this.supabaseClient.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (!user) {
        return new HttpException(
          error?.code || "Couldn't login user",
          HttpStatus.OK,
        );
      }

      const userDB = await this.userService.findUserByEmail(data.email);

      if (!userDB) {
        return new HttpException('User not found in DB', HttpStatus.NOT_FOUND);
      }

      return new HttpResponseDto(HttpStatus.OK, 'User logged in successfully', {
        accessToken: session?.access_token,
        refreshToken: session?.refresh_token,
        user: userDB,
      });
    } catch (err: any) {
      console.error(err);
      return new HttpException(
        (err.message as string) ?? 'server_error',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
