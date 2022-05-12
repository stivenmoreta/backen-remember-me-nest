import { IsBoolean, IsOptional } from 'class-validator';

export class ResponseDto {
  @IsBoolean()
  success: boolean;

  @IsOptional()
  data: any;
}
