import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
//ENTITYS
import { Usuario } from '../../auth/entities/usuario.entity';
import { Medicamento } from '../../medicamento/entities/medicamento.entity';
//DTO
import { FichaMedicaDto } from '../dto/ficha-medica';

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

  //M:1
  //Muchos adultos mayores tienen solo tiene un usuario
  @ManyToOne(() => Usuario, (usuario) => usuario.adulto_mayor)
  @JoinColumn({ name: 'fk_usuario_id' })
  usuario: Usuario;

  //1:M
  //Un adulto mayor tiene muchos medicamentos
  @OneToMany(() => Medicamento, (medicamento) => medicamento.adultoMayor)
  medicamento: Medicamento[];

  @Column({ type: 'jsonb', default: null })
  fichaMedica: FichaMedicaDto;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
