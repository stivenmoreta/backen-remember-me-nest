import { EntityRepository, Repository } from 'typeorm';
import { AdultoMayor } from './entities/adulto_mayor.entity';
import { CreateAdultoMayorDto } from './dto/create-adulto_mayor.dto';
import { ConflictException } from '@nestjs/common';

@EntityRepository(AdultoMayor)
export class AdultoMayorRepository extends Repository<AdultoMayor> {
  async createAdultoMayor(
    createAdultoMayorDto: CreateAdultoMayorDto,
  ): Promise<void> {
    console.log(createAdultoMayorDto);

    try {
      const adulto_mayor = await this.insert(createAdultoMayorDto);
      console.log(adulto_mayor);
    } catch (error) {
      console.log(error);
      throw new ConflictException('Ocurrio un error');
    }
  }

  //Quiero todos mis adultos mayores | any por mientras
  async findAllMyAdultoMayor(idUsuario: string): Promise<AdultoMayor[]> {
    return await this.find({
      relations: ['usuario'],
      where: {
        id: idUsuario,
      },
    });
  }
}
