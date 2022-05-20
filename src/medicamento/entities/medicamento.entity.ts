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
export class Medicamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  dosis: string;

  @Column()
  horario: string;

  @Column()
  fecha_inicio: Date;

  @Column()
  fecha_termino: Date;

  //M:1
  //Muchos medicamentos tiene solo un adulto mayor (la lista de medicamentos es independiente)
  @ManyToOne(() => AdultoMayor, (adultoMayor) => adultoMayor.medicamento)
  @JoinColumn({ name: 'fk_adulto_mayor_id' })
  adultoMayor: AdultoMayor;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
