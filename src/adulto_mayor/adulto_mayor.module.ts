import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdultoMayorController } from './adulto_mayor.controller';
import { AdultoMayorService } from './adulto_mayor.service';
import { AdultoMayorRepository } from './adulto_mayor.repository';

//modulos externos
import { AuthModule } from '../auth/auth.module';

//TypeOrmModule.forFeature --> para que se pueda usar en el service
@Module({
  imports: [TypeOrmModule.forFeature([AdultoMayorRepository]), AuthModule],
  controllers: [AdultoMayorController],
  providers: [AdultoMayorService],
  exports: [AdultoMayorModule],
})
export class AdultoMayorModule {}
