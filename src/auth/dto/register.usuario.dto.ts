import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterUsuarioDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 30, { message: 'El nombre debe tener entre 2 y 30 caracteres' })
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 30, { message: 'El apellido debe tener entre 2 y 30 caracteres' })
  apellido: string;

  @IsNotEmpty()
  @IsString()
  @Length(9, 9, { message: 'El rut debe tener 9 caracteres' })
  rut: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Formato del Email no es correcto' })
  email: string;

  @IsNotEmpty()
  @Length(9, 9, { message: 'El rut debe tener 9 caracteres' })
  telefono: string;

  @IsNotEmpty()
  @Length(8, 30, {
    message: 'La Contraseña debe tener entre 8 y 30 caracteres',
  })
  password: string;
}
