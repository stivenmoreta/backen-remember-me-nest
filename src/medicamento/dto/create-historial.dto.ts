import { IsNotEmpty, IsNumberString, IsString, Length } from 'class-validator';
export class CreateHistorialDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  nombre: string;
}
