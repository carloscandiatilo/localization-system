import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity('modules')
export class Module {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ default: '' })
  descricao: string;

  @Column({ type: 'boolean', nullable: true, default: false }) 
  isModulo: boolean | null;

  @Column({ name: 'paiId', nullable: true })
  paiId?: number | null;

  @ManyToOne(() => Module, (module) => module.submodulos, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'paiId' })
  pai?: Module | null;

  @OneToMany(() => Module, (module) => module.pai, {
    cascade: true,
  })
  submodulos: Module[];

  @Column({ default: false })
  isDeleted: boolean;
}
