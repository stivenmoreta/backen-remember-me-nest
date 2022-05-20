import { IsEmail, IsNotEmpty } from 'class-validator';

export class RecoverDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Formato del email ingresado no es correcto' })
  email: string;
}
