import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Formato del email ingresado no es correcto' })
  email: string;

  @IsNotEmpty()
  @Length(8, 30, {
    message: 'La Contraseña debe tener entre 8 y 30 caracteres',
  })
  password: string;
}
