import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports:[DatabaseModule],
  controllers: [BlogController],
  providers: [BlogService,JwtStrategy],
  
})
export class BlogModule {}
