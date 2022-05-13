import { EntityRepository, Repository } from 'typeorm';
import { AdultoMayor } from './entities/adulto_mayor.entity';
import { CreateAdultoMayorDto } from './dto/create-adulto_mayor.dto';
import { ConflictException } from '@nestjs/common';
import { UsuariosRepository } from '../auth/usuarios.repository';
import { Usuario } from '../auth/entities/usuario.entity';

@EntityRepository(AdultoMayor)
export class AdultoMayorRepository extends Repository<AdultoMayor> {
  // eslint-disable-next-line prettier/prettier
  async createAdultoMayor(
    createAdultoMayorDto: CreateAdultoMayorDto,
    usuario: Usuario,
  ): Promise<void> {
    //el nuevo adulto mayor debe estar enlazado al usuario
    console.log(usuario);
    const newAdultoMayor = new AdultoMayor();
    newAdultoMayor.usuario = usuario;
    newAdultoMayor.nombre = createAdultoMayorDto.nombre;
    newAdultoMayor.apellido = createAdultoMayorDto.apellido;
    newAdultoMayor.rut = createAdultoMayorDto.rut;
    newAdultoMayor.email = createAdultoMayorDto.email;
    newAdultoMayor.direccion = createAdultoMayorDto.direccion;
    newAdultoMayor.telefono = createAdultoMayorDto.telefono;
    console.log(newAdultoMayor);
    await this.save(newAdultoMayor);
  }

  //Quiero todos mis adultos mayores | any por mientras
  async findAllMyAdultoMayor(usuarioId: string): Promise<AdultoMayor[]> {
    return await this.find({ where: { usuario: usuarioId } });
  }
}
