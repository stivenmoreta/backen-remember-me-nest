import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

import { AdultoMayorController } from './adulto_mayor.controller';
import { AdultoMayorService } from './adulto_mayor.service';
import { AdultoMayor } from './entities/adulto_mayor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdultoMayor])],
  controllers: [AdultoMayorController],
  providers: [AdultoMayorService],
  exports: [AdultoMayorService],
})
export class AdultoMayorModule {}
