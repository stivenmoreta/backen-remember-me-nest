import { IsEmail, IsNotEmpty, Length , IsString} from 'class-validator';

export class LoginAdultoDto {
  @IsNotEmpty()
  @IsString()
  rut: string;

}
