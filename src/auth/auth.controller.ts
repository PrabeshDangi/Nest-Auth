import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerdto:RegisterDto){
    return this.authService.register(registerdto)
  }

  

  @Post('login')
  login(@Body() logindto:LoginDto,@Req() req, @Res() res){
    return this.authService.login(logindto,req,res)
  } 

  @Get('logout')
  logout(@Req() req, @Res() res){
    return this.authService.logout(req,res)
  }
}
