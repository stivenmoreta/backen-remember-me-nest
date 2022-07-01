import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//MEDICAMENTO
import { MedicamentoController } from './medicamento.controller';
import { MedicamentoService } from './medicamento.service';
//ENTYTIS
import { Medicamento } from './entities/medicamento.entity';
import { AdultoMayor } from 'src/adulto_mayor/entities/adulto_mayor.entity';
import { Historial } from './entities/historial.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medicamento, AdultoMayor, Historial])],
  controllers: [MedicamentoController],
  providers: [MedicamentoService],
})
export class MedicamentoModule {}
