import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerdto:RegisterDto){
    return this.authService.register(registerdto)
  }

  // @Post('register')
  // async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
  //   try {
  //     const result = await this.authService.register(registerDto);
  //     res.status(HttpStatus.CREATED).json({
  //       message: result.message,
  //       user: result.user,
  //     });
  //   } catch (error) {
  //     res.status(HttpStatus.BAD_REQUEST).json({
  //       statusCode: HttpStatus.BAD_REQUEST,
  //       message: error.message,
  //     });
  //   }
  // }

  @Post('login')
  login(){
    return this.authService.login()
  }

  @Post('logout')
  logout(){
    return this.authService.logout()
  }
}
