import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//REPOSITORYS
import { Repository } from 'typeorm';
//DTOS
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';
//ENTITY
import { Medicamento } from './entities/medicamento.entity';
import { AdultoMayor } from '../adulto_mayor/entities/adulto_mayor.entity';
import { Historial } from './entities/historial.entity';
import { CreateHistorialDto } from './dto/create-historial.dto';

@Injectable()
export class MedicamentoService {
  constructor(
    @InjectRepository(Medicamento)
    private medicamentoRepository: Repository<Medicamento>,
    @InjectRepository(Historial)
    private historialRepository: Repository<Historial>,
    @InjectRepository(AdultoMayor)
    private adultoMayorRepository: Repository<AdultoMayor>,
  ) {}

  async createMedicamento(
    idAdultoMayor: string,
    createMedicamentoDto: CreateMedicamentoDto,
  ): Promise<void> {
    //necesito el id del abuelo para sacar sus datos y ingresar sus medicamentos
    const adultoMayor = await this.adultoMayorRepository.findOne({
      where: { id: idAdultoMayor },
    });

    //creo un medicamento y le asigno su adulto mayor
    const newMedicamento = new Medicamento();
    newMedicamento.adultoMayor = adultoMayor;
    newMedicamento.nombre = createMedicamentoDto.nombre;
    newMedicamento.dosis = createMedicamentoDto.dosis;
    newMedicamento.horario = createMedicamentoDto.horario;
    newMedicamento.fecha_inicio = createMedicamentoDto.fecha_inicio;
    newMedicamento.fecha_termino = createMedicamentoDto.fecha_termino;
    await this.medicamentoRepository.save(newMedicamento);
  }

  async historial(
    idAdultoMayor: string,
    createHistorialDto: CreateHistorialDto,
  ): Promise<void> {
    //necesito el id del abuelo para sacar sus datos y ingresar sus medicamentos
    const adultoMayor = await this.adultoMayorRepository.findOne({
      where: { id: idAdultoMayor },
    });

    await this.historialRepository.save({
      adultoMayor,
      nombre: createHistorialDto.nombre,
      fecha_tomado: new Date(),
    });
  }

  async findAll(idAdultoMayor: string): Promise<Medicamento[]> {
    return await this.medicamentoRepository.find({
      where: { adultoMayor: idAdultoMayor },
    });
  }

  async findHistorialAll(idAdultoMayor: string): Promise<Historial[]> {
    return await this.historialRepository.find({
      where: { adultoMayor: idAdultoMayor },
      order: { fecha_tomado: 'DESC' },
    });
  }
}
