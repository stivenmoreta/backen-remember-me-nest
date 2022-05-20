import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LoginDto } from './dto/login.usuario.dto';
import { RegisterUsuarioDto } from './dto/register.usuario.dto';
import { RecoverDto } from './dto/recover.usuario.dto';
import { ResetDto } from './dto/reset.usuario.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() registerUsuarioDto: RegisterUsuarioDto): Promise<void> {
    return this.authService.registerUsuario(registerUsuarioDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }

  @Post('/recover')
  recover(@Body() recoverDto: RecoverDto): Promise<boolean> {
    return this.authService.recover(recoverDto);
  }

  @Post('/reset')
  reset(@Body() resetDto: ResetDto): Promise<boolean> {
    return this.authService.reset(resetDto);
  }
}
