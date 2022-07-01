import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicamentoService } from './medicamento.service';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';
import { CreateHistorialDto } from './dto/create-historial.dto';

@Controller('medicamento')
export class MedicamentoController {
  constructor(private readonly medicamentoService: MedicamentoService) {}

  @Post(':id')
  create(
    @Param('id') idAdultoMayor: string,
    @Body() createMedicamentoDto: CreateMedicamentoDto,
  ) {
    return this.medicamentoService.createMedicamento(
      idAdultoMayor,
      createMedicamentoDto,
    );
  }

  @Post(':id/historial')
  historial(
    @Param('id') idAdultoMayor: string,
    @Body() createHistorialDto: CreateHistorialDto,
  ) {
    return this.medicamentoService.historial(idAdultoMayor, createHistorialDto);
  }

  @Get(':id')
  findAll(@Param('id') idAdultoMayor: string) {
    console.log(idAdultoMayor);
    return this.medicamentoService.findAll(idAdultoMayor);
  }

  @Get(':id/historial')
  findHistorialAll(@Param('id') idAdultoMayor: string) {
    console.log(idAdultoMayor);
    return this.medicamentoService.findHistorialAll(idAdultoMayor);
  }
}
