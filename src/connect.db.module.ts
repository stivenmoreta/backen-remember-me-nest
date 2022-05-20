import { TypeOrmModule } from '@nestjs/typeorm';
export default TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'admin',
  password: 'admin',
  database: 'remember',
  autoLoadEntities: true,
  synchronize: true, //borrar en produccion
});
