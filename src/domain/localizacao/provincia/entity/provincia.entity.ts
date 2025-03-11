import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity('provincias')
export class Provincia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean;

  @Column({ nullable: true })
  createdBy: number;

  @Column({ nullable: true })
  updatedBy: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // @ManyToOne(() => User, { nullable: true, eager: true })
  // @JoinColumn({ name: 'createdBy' })
  // // criadoPor: User;
  
  // @ManyToOne(() => User, { nullable: true, eager: true })
  // @JoinColumn({ name: 'updatedBy' })
  // atualizadoPor: User;
}
