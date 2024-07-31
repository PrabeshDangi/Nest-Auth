import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  @Length(1,200)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

}