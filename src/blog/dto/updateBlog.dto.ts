import { IsNotEmpty, IsString, Length } from 'class-validator'

export class updateBlogDto{
    @IsString()
    @IsNotEmpty()
    @Length(1,200)
    title: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;
}