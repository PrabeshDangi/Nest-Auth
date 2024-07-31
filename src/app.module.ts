import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, BlogModule,PassportModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
