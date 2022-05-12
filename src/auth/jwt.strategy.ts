import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuariosRepository } from './usuarios.repository';

import * as dotenv from 'dotenv';
import { JwtPayload } from './jwt.payload.interface';
import { Usuario } from './entities/usuario.entity';
dotenv.config();
//la clase JwtStrategy Va a enviar el JwtPayLoad a validate
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsuariosRepository)
    private usuariosRepository: UsuariosRepository,
  ) {
    super({
      secretOrKey: process.env.TOKEN_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  //Este metodo se llamara cuando se haga una peticion con el token en el header
  async validate(payload: JwtPayload): Promise<Usuario> {
    const { email } = payload;
    const usuario = this.usuariosRepository.findOneByEmail(email);
    if (!usuario) {
      throw new UnauthorizedException();
    }
    return usuario;
  }
}
