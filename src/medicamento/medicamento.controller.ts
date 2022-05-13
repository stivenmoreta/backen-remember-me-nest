import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Delete,
} from '@nestjs/common';
import { MedicamentoService } from './medicamento.service';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';
import { AdultoMayor } from '../adulto_mayor/entities/adulto_mayor.entity';

@Controller('medicamento')
export class MedicamentoController {
  constructor(private readonly medicamentoService: MedicamentoService) {}

  @Post(':id')
  create(
    @Param('id') idAdultoMayor: string,
    @Body() createMedicamentoDto: CreateMedicamentoDto,
  ) {
    console.log(idAdultoMayor);
    console.log(createMedicamentoDto);
    return this.medicamentoService.createMedicamento(
      idAdultoMayor,
      createMedicamentoDto,
    );
  }

  @Get()
  findAll() {
    return this.medicamentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicamentoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedicamentoDto: UpdateMedicamentoDto,
  ) {
    return this.medicamentoService.update(+id, updateMedicamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicamentoService.remove(+id);
  }
}
