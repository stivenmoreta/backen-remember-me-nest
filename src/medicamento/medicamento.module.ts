import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicamentoController } from './medicamento.controller';
import { MedicamentoService } from './medicamento.service';
import { Medicamento } from './entities/medicamento.entity';
import { MedicamentoRepository } from './medicmaneto.repository';
import { AdultoMayorModule } from '../adulto_mayor/adulto_mayor.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicamentoRepository]),
    AdultoMayorModule,
  ],
  controllers: [MedicamentoController],
  providers: [MedicamentoService],
})
export class MedicamentoModule {}
