import {
  IsDate,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';
export class CreateMedicamentoDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  nombre: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(1, 1)
  dosis: number;

  @IsNotEmpty()
  @IsNumberString()
  @Length(1, 2)
  horario: number;

  @IsNotEmpty()
  fecha_inicio: Date;

  @IsNotEmpty()
  fecha_termino: Date;
}
