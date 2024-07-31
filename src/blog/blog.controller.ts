import { Body, Controller, Get, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/createBlog.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { updateBlogDto } from './dto/updateBlog.dto';



@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get(':id')
  getBlogById(@Param() Params:{id:number},@Req() req, @Res() res)
  {
    this.blogService.getBlogById(Params.id,req,res)
  }

  @Get()
  getAllBlogs(@Req() req, @Res() res){
    this.blogService.getAllBlogs(req,res);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createBlog(@Body() createblogdto:CreateBlogDto,@Req() req,@Res() res){
    const user=req.user
    return this.blogService.createBlog(createblogdto,user,res)
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('update/:id')
 async updateBlog(
    @Param('id') id:number,
    @Body() updateblogdto:updateBlogDto,
    @Res() res,
    @Req() req
  ){
    
    const user=req.user;
    return this.blogService.updateBlog(updateblogdto,user,res)

  }

}
