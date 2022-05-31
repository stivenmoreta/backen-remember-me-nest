import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AdultoMayorModule } from './adulto_mayor/adulto_mayor.module';
import { MedicamentoModule } from './medicamento/medicamento.module';
import ConnectDbModule from './connect.db.module';
import { MailtrapModule } from './mailtrap/mailtrap.module';

@Module({
  imports: [
    ConnectDbModule,
    AdultoMayorModule,
    AuthModule,
    MedicamentoModule,
    MailtrapModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
