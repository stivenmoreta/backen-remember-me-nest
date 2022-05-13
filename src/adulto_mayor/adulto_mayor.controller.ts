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
import { UpdateAdultoMayorDto } from './dto/update-adulto_mayor.dto';
import { SearchAdultoMayorDto } from './dto/search-adultos_mayores.dt';

@UseGuards(JwtAuthGuard)
@Controller('adulto-mayor')
export class AdultoMayorController {
  constructor(private readonly adultoMayorService: AdultoMayorService) {}

  @Post('/create')
  create(@Request() req, @Body() createAdultoMayorDto: CreateAdultoMayorDto) {
    return this.adultoMayorService.createAdultoMayor(
      createAdultoMayorDto,
      req.user,
    );
  }

  @Get('/findAll')
  findAll(@Request() req) {
    return this.adultoMayorService.findAllMyAdultoMayor(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adultoMayorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdultoMayorDto: UpdateAdultoMayorDto,
  ) {
    return this.adultoMayorService.update(+id, updateAdultoMayorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adultoMayorService.remove(+id);
  }
}
