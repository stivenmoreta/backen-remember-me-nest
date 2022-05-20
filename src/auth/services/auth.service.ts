import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuariosRepository } from '../usuarios.repository';
import { RegisterUsuarioDto } from '../dto/register.usuario.dto';
import { EncoderService } from './encoder.service';
import { LoginDto } from '../dto/login.usuario.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../jwt.payload.interface';
import { RecoverDto } from '../dto/recover.usuario.dto';
import { MailtrapService } from '../../mailtrap/mailtrap.service';
import { ResetDto } from '../dto/reset.usuario.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsuariosRepository)
    private usuariosRepository: UsuariosRepository,
    private encoderService: EncoderService,
    private jwtService: JwtService,
    private mailtrapService: MailtrapService,
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
        ...usuario,
      };
      return data;
    }
    throw new UnauthorizedException('Credenciales incorrectas');
  }

  async recover(recoverDto: RecoverDto): Promise<boolean> {
    const { email } = recoverDto;
    const usuario = await this.usuariosRepository.findOneByEmail(email);
    if (usuario) {
      const tempToken = Math.random().toString(36).substring(7);
      await this.usuariosRepository.update({ email }, { tempToken });

      const url = 'http://127.0.0.1:5500/pages/reiniciar.html?tempToken=' + tempToken;
      const html = `
      <!doctype html>
      <html lang="en-US">
      
      <head>
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <title>Reinicio de contraseña</title>
          <meta name="description" content="Reinicio de contraseña">
          <style type="text/css">
              a:hover {text-decoration: underline !important;}
          </style>
      </head>
      
      <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
          <!--100% body table-->
          <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
              style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
              <tr>
                  <td>
                      <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                          align="center" cellpadding="0" cellspacing="0">
                          <tr>
                              <td style="height:80px;">&nbsp;</td>
                          </tr>
                          <tr>
                              <td style="text-align:center;">
                                <a href="https://rakeshmandal.com" title="logo" target="_blank">
                                  <img width="60" src="https://i.ibb.co/hL4XZp2/android-chrome-192x192.png" title="logo" alt="logo">
                                </a>
                              </td>
                          </tr>
                          <tr>
                              <td style="height:20px;">&nbsp;</td>
                          </tr>
                          <tr>
                              <td>
                                  <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                      style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                      <tr>
                                          <td style="height:40px;">&nbsp;</td>
                                      </tr>
                                      <tr>
                                          <td style="padding:0 35px;">
                                              <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Ha solicitado reinciar su contraseña
                                              </h1>
                                              <span
                                                  style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                              <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                              Se ha generado una contraseña para usted. Para reiniciar su contraseña, haga clic en el siguiente enlace y siga las instrucciones.
                                              </p>
                                              <a href=`+ url +`
                                                  style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reiniciar
                                                  Contraseña</a>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style="height:40px;">&nbsp;</td>
                                      </tr>
                                  </table>
                              </td>
                          <tr>
                              <td style="height:20px;">&nbsp;</td>
                          </tr>
                          <tr>
                              <td style="text-align:center;">
                                  <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.remember.cl</strong></p>
                              </td>
                          </tr>
                          <tr>
                              <td style="height:80px;">&nbsp;</td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
          <!--/100% body table-->
      </body>
      
      </html>`;

      const body = {
        from: 'no-reply@remember.cl',
        to: usuario.email,
        subject: 'Recuperar contraseña',
        html,
        cc: [],
        bcc: [],
      };

      await this.mailtrapService.send(body);
      return true;
    }

    return false;
  }

  async reset(resetDto: ResetDto): Promise<boolean> {
    const { password, tempToken } = resetDto;
    const usuario = await this.usuariosRepository.find({ tempToken });
    if (usuario) {
      const passwordCrypt = await this.encoderService.encoderPassword(password);
      await this.usuariosRepository.update(
        { tempToken },
        { password: passwordCrypt },
      );
      return true;
    }

    return false;
  }
}
