import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuariosRepository } from '../usuarios.repository';
import { RegisterUsuarioDto } from '../dto/register.usuario.dto';
import { EncoderService } from './encoder.service';
import { LoginDto } from '../dto/login.usuario.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../jwt.payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsuariosRepository)
    private usuariosRepository: UsuariosRepository,
    private encoderService: EncoderService,
    private jwtService: JwtService,
  ) {}

  async registerUsuario(registerUsuarioDto: RegisterUsuarioDto): Promise<void> {
    const passwordCrypt = await this.encoderService.encoderPassword(
      registerUsuarioDto.password,
    );
    registerUsuarioDto.password = passwordCrypt;
    return await this.usuariosRepository.createUsuario(registerUsuarioDto);
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const usuario = await this.usuariosRepository.findOneByEmail(email);
    if (
      usuario &&
      (await this.encoderService.checkPassword(password, usuario.password))
    ) {
      const payload: JwtPayload = {
        id: usuario.id,
        email: usuario.email,
      };
      const accessToken = await this.jwtService.sign(payload);

      const data = {
        accessToken,
        nombre: usuario.nombre,
      };
      return data;
    }
    throw new UnauthorizedException('Credenciales incorrectas');
  }
}
