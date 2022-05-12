import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdultoMayorDto } from './dto/create-adulto_mayor.dto';
import { UpdateAdultoMayorDto } from './dto/update-adulto_mayor.dto';
import { AdultoMayorRepository } from './adulto_mayor.repository';
import { AdultoMayor } from './entities/adulto_mayor.entity';

@Injectable()
export class AdultoMayorService {
  constructor(
    @InjectRepository(AdultoMayorRepository)
    private adultoMayorRepository: AdultoMayorRepository,
  ) {}

  async createAdultoMayor(
    createAdultoMayorDto: CreateAdultoMayorDto,
  ): Promise<void> {
    return await this.adultoMayorRepository.createAdultoMayor(
      createAdultoMayorDto,
    );
  }

  async findAllMyAdultoMayor({ idUsuario }): Promise<AdultoMayor[]> {
    return await this.adultoMayorRepository.findAllMyAdultoMayor(idUsuario);
  }

  findOne(id: number) {
    return `This action returns a #${id} adultoMayor`;
  }

  update(id: number, updateAdultoMayorDto: UpdateAdultoMayorDto) {
    return `This action updates a #${id} adultoMayor`;
  }

  remove(id: number) {
    return `This action removes a #${id} adultoMayor`;
  }
}
