import { PartialType } from '@nestjs/mapped-types';
import { CreateAdultoMayorDto } from './create-adulto_mayor.dto';

export class UpdateAdultoMayorDto extends PartialType(CreateAdultoMayorDto) {}
