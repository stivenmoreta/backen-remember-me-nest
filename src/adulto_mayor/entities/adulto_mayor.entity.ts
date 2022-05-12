import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Usuario } from '../../auth/entities/usuario.entity';
@Entity()
export class AdultoMayor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30 })
  nombre: string;

  @Column({ type: 'varchar', length: 30 })
  apellido: string;

  @Column({ unique: true, type: 'varchar', length: 9 })
  rut: string;

  @Column({ unique: true, type: 'varchar', length: 120 })
  email: string;

  @Column({ unique: true, type: 'varchar', length: 9 })
  telefono: string;

  @Column({ type: 'varchar', length: 150 })
  direccion: string;

  //m:N
  //Muchos adultos mayores tienen solo tiene un usuario
  @ManyToOne(() => Usuario, (usuario) => usuario.adulto_mayor)
  usuario: Usuario;

  /* 
  fichaSalud(JSON)
  */

  @CreateDateColumn({
    name: 'createdAt',
    type: 'timestamp',
    default: new Date(),
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updatedAt',
    type: 'timestamp',
    default: new Date(),
  })
  updatedAt: Date;
}
