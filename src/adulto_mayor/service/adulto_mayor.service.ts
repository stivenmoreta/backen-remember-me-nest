import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdultoMayorRepository } from '../adulto_mayor.repository';
import { AdultoMayor } from '../entities/adulto_mayor.entity';

export class AdultoMayorService {
  constructor(
    @InjectRepository(AdultoMayor)
    private adultoMayorRepository: Repository<AdultoMayor>,
  ) {}

  async buscar(): Promise<AdultoMayor[]> {
    const algo = this.adultoMayorRepository.find();
    console.log(algo);
    return algo;
  }
}
