import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AdultoMayorModule } from './adulto_mayor/adulto_mayor.module';
import ConnectDbModule from './connect.db.module';

@Module({
  imports: [ConnectDbModule, AuthModule, AdultoMayorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
