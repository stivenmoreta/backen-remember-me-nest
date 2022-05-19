import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdultoMayorService } from './adulto_mayor.service';
import { CreateAdultoMayorDto } from './dto/create-adulto_mayor.dto';

@UseGuards(JwtAuthGuard)
@Controller('adulto-mayor')
export class AdultoMayorController {
  constructor(private readonly adultoMayorService: AdultoMayorService) {}

  /* 
   Creas un adulto mayor enlazado al usuario, se necesita token.
  */
  @Post('/create')
  create(@Request() req, @Body() createAdultoMayorDto: CreateAdultoMayorDto) {
    return this.adultoMayorService.createAdultoMayor(
      req.user,
      createAdultoMayorDto,
    );
  }

  /* 
    Encuentras a todos los adultos mayores de un usuario
  */
  @Get('/findAll')
  findAll(@Request() req) {
    return this.adultoMayorService.findAllMyAdultoMayor(req.user.id);
  }
}
