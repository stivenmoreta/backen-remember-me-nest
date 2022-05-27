import { InjectRepository } from '@nestjs/typeorm';
//ENTITY
import { Usuario } from 'src/auth/entities/usuario.entity';
import { AdultoMayor } from './entities/adulto_mayor.entity';
//DTO
import { CreateAdultoMayorDto } from './dto/create-adulto_mayor.dto';
import { UpdateAdultoMayorDto } from './dto/update-adulto_mayor.dto';
import { Repository } from 'typeorm';

export class AdultoMayorService {
  constructor(
    @InjectRepository(AdultoMayor)
    private adultoMayorRepository: Repository<AdultoMayor> /*     @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>, */,
  ) {}

  async createAdultoMayor(
    usuario: Usuario,
    createAdultoMayorDto: CreateAdultoMayorDto,
  ): Promise<void> {
    const newAdultoMayor = construccionNewAdultoMayor(
      createAdultoMayorDto,
      usuario,
    );
    await this.adultoMayorRepository.save(newAdultoMayor);
  }

  //Quiero todos mis adultos mayores | any por mientras
  async findAllMyAdultoMayor(usuarioId: string): Promise<AdultoMayor[]> {
    return await this.adultoMayorRepository.find({
      where: { usuario: usuarioId },
    });
  }

  async findByRut(rut: string): Promise<AdultoMayor> {
    return this.adultoMayorRepository.findOne({
      where: { rut },
    });
  }
}

const construccionNewAdultoMayor = (
  createAdultoMayorDto,
  usuario,
): AdultoMayor => {
  const newAdultoMayor = new AdultoMayor();
  newAdultoMayor.usuario = usuario;
  newAdultoMayor.nombre = createAdultoMayorDto.nombre;
  newAdultoMayor.apellido = createAdultoMayorDto.apellido;
  newAdultoMayor.rut = createAdultoMayorDto.rut;
  newAdultoMayor.email = createAdultoMayorDto.email;
  newAdultoMayor.direccion = createAdultoMayorDto.direccion;
  newAdultoMayor.telefono = createAdultoMayorDto.telefono;
  newAdultoMayor.fichaMedica = createAdultoMayorDto.fichaMedica;
  return newAdultoMayor;
};
