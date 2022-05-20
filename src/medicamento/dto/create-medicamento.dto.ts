import { IsNotEmpty, IsNumberString, IsString, Length } from 'class-validator';
export class CreateMedicamentoDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  nombre: string;

  @IsNotEmpty()
  @IsString()
  dosis: string;

  @IsNotEmpty()
  @IsString()
  horario: string;

  @IsNotEmpty()
  fecha_inicio: Date;

  @IsNotEmpty()
  fecha_termino: Date;
}
