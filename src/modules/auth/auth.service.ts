import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { env } from 'src/config/env';
import { CreateUserDto } from './dto/createUserDto';

@Injectable()
export class AuthService implements OnModuleInit {
  client: SupabaseClient;

  onModuleInit() {
    if (this.client) return;
    this.client = createClient(env.SUPABASE_URL, env.SUPABASE_NEON_KEY);
  }

  async createUserSupabase(credentials: CreateUserDto) {
    return await this.client.auth.signUp({
      email: credentials.email,

      password: credentials.password,
    });
  }
}
