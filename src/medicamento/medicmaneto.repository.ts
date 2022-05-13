import { InjectRepository } from '@nestjs/typeorm';
import { AdultoMayor } from 'src/adulto_mayor/entities/adulto_mayor.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { Medicamento } from './entities/medicamento.entity';
import { AdultoMayorService } from '../adulto_mayor/service/adulto_mayor.service';
@EntityRepository(Medicamento)
export class MedicamentoRepository extends Repository<Medicamento> {
  constructor(private adultoMayorService: AdultoMayorService) {
    super();
  }
  // eslint-disable-next-line prettier/prettier
  async createMedicamento(
    idAdultoMayor: string,
    createMedicamentoDto: CreateMedicamentoDto,
  ): Promise<void> {
    //NECEISTO EL ADULTO COMPLETO
    try {
      const adultoMayor = await this.adultoMayorService.buscar;
      console.log(adultoMayor);
    } catch (error) {
      console.log(error);
    }

    const newMedicamento = new Medicamento();
    //newMedicamento.adultoMayor = adultoMayor;
    newMedicamento.nombre = createMedicamentoDto.nombre;
    newMedicamento.dosis = createMedicamentoDto.dosis;
    newMedicamento.horario = createMedicamentoDto.horario;
    newMedicamento.fecha_inicio = createMedicamentoDto.fecha_inicio;
    newMedicamento.fecha_termino = createMedicamentoDto.fecha_termino;

    console.log('estoy que');
    console.log(newMedicamento);
    await this.save(newMedicamento);
  }
}
