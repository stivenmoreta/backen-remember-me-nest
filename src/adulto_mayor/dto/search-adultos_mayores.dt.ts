import { IsNotEmpty } from 'class-validator';
export class SearchAdultoMayorDto {
  @IsNotEmpty({ message: 'Debe ingresar el id del usuario' })
  usuarioId: string;
}
