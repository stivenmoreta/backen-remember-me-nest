import { EntityRepository, Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { RegisterUsuarioDto } from './dto/register.usuario.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Usuario)
export class UsuariosRepository extends Repository<Usuario> {
  async createUsuario(registerUsuarioDto: RegisterUsuarioDto): Promise<void> {
    const user = this.create(registerUsuarioDto);
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        if (error.detail.includes('rut')) {
          throw new ConflictException({
            message: 'El rut ingresado ya existe',
          });
        } else if (error.detail.includes('email')) {
          throw new ConflictException({
            message: 'El email ingresado ya existe',
          });
        } else if (error.detail.includes('telefono')) {
          throw new ConflictException({
            message: 'El telefono ingresado ya existe',
          });
        }
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findOneByEmail(email: string): Promise<Usuario> {
    return await this.findOne({ email });
  }
}
