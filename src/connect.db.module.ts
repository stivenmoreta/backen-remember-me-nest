import { TypeOrmModule } from '@nestjs/typeorm';
export default TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123',
  database: 'remember-me',
  autoLoadEntities: true,
  synchronize: true, //borrar en produccion
});
