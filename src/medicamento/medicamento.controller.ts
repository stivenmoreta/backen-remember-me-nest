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

  @Get(':id')
  findAll(@Param('id') idAdultoMayor: string) {
    console.log(idAdultoMayor);
    return this.medicamentoService.findAll(idAdultoMayor);
  }
}
