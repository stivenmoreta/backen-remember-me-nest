import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdultoMayor } from 'src/adulto_mayor/entities/adulto_mayor.entity';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';
import { MedicamentoRepository } from './medicmaneto.repository';

@Injectable()
export class MedicamentoService {
  constructor(
    @InjectRepository(MedicamentoRepository)
    private medicamentoRepository: MedicamentoRepository,
  ) {}

  createMedicamento(
    idAdultoMayor: string,
    createMedicamentoDto: CreateMedicamentoDto,
  ) {
    console.log(idAdultoMayor);
    console.log(createMedicamentoDto);
    return this.medicamentoRepository.createMedicamento(
      idAdultoMayor,
      createMedicamentoDto,
    );
  }

  findAll() {
    return `This action returns all medicamento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicamento`;
  }

  update(id: number, updateMedicamentoDto: UpdateMedicamentoDto) {
    return `This action updates a #${id} medicamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicamento`;
  }
}
