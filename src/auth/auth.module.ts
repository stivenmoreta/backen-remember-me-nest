import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { EncoderService } from './services/encoder.service';
import { UsuariosRepository } from './usuarios.repository';

import * as dotenv from 'dotenv';
import { JwtStrategy } from './jwt.strategy';
import { MailtrapModule } from 'src/mailtrap/mailtrap.module';
import { AdultoMayorModule } from 'src/adulto_mayor/adulto_mayor.module';
dotenv.config();
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.TOKEN_SECRET,
      signOptions: {
        expiresIn: '31d',
      },
    }),
    TypeOrmModule.forFeature([UsuariosRepository]),
    UsuariosRepository,
    MailtrapModule,
    AdultoMayorModule,
  ],

  controllers: [AuthController],
  providers: [AuthService, EncoderService, JwtStrategy],
  exports: [JwtStrategy, PassportModule, UsuariosRepository],
})
export class AuthModule {}
