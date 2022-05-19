import {
  IsEmail,
  IsJSON,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';
import { FichaMedicaDto } from './ficha-medica';
export class CreateAdultoMayorDto {
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
  @IsNumberString()
  @Length(9, 9, { message: 'El telefono debe tener 9 caracteres' })
  telefono: string;

  @IsNotEmpty()
  @Length(2, 150, {
    message: 'La direccion debe tener entre 2 y 150 caracteres ',
  })
  direccion: string;

  fichaMedica: FichaMedicaDto;
}
