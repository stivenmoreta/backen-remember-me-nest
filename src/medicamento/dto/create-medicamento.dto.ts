import { IsNotEmpty, IsNumberString, IsString, Length } from 'class-validator';
export class CreateMedicamentoDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 1)
  dosis: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 2)
  horario: string;

  @IsNotEmpty()
  fecha_inicio: Date;

  @IsNotEmpty()
  fecha_termino: Date;
}
