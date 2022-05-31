import { Length, IsNotEmpty } from 'class-validator';

export class ResetDto {
  @IsNotEmpty()
  @Length(8, 30, {
    message: 'La Contraseña debe tener entre 8 y 30 caracteres',
  })
  password: string;

  @IsNotEmpty()
  tempToken: string;
}
