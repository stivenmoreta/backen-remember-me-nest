import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AdultoMayor } from '../../adulto_mayor/entities/adulto_mayor.entity';

@Entity()
export class Usuario {
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

  @Column({ type: 'varchar', length: 100 })
  password: string;

  //n:m
  //Un usuario tiene muchos adultos mayores
  @OneToMany(() => AdultoMayor, (adultomayor) => adultomayor.usuario)
  adulto_mayor: AdultoMayor[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
