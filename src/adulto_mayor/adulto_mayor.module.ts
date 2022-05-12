import { Module } from '@nestjs/common';
import { AdultoMayorService } from './adulto_mayor.service';
import { AdultoMayorController } from './adulto_mayor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdultoMayorRepository } from './adulto_mayor.repository';

//TypeOrmModule.forFeature --> para que se pueda usar en el service
@Module({
  imports: [TypeOrmModule.forFeature([AdultoMayorRepository])],
  controllers: [AdultoMayorController],
  providers: [AdultoMayorService],
})
export class AdultoMayorModule {}
