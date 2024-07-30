

import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { Role } from '@prisma/client'; 

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100) 
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 100,{message:"password must be of minimum length 6"}) 
  password: string;

  @IsOptional()
  role?: Role; 
}
