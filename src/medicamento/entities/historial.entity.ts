import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AdultoMayor } from '../../adulto_mayor/entities/adulto_mayor.entity';

@Entity()
export class Historial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column()
  fecha_tomado: Date;

  @ManyToOne(() => AdultoMayor, (adultoMayor) => adultoMayor.historial)
  @JoinColumn({ name: 'fk_adulto_mayor_id' })
  adultoMayor: AdultoMayor;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
