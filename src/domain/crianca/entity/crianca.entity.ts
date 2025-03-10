import { User } from 'src/core/auth/user/entity/user.entity';
import { 
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, 
  CreateDateColumn, UpdateDateColumn 
} from 'typeorm';

@Entity('criancas')
export class Crianca {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ type: 'text', nullable: true })  // Ajuste para aceitar descrição opcional
  descricao: string;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ nullable: true })
  createdBy: number;  // Armazena o ID do usuário que criou

  @Column({ nullable: true })
  updatedBy: number;  // Armazena o ID do usuário que atualizou

  @CreateDateColumn()
  createdAt: Date;  // Preenchido automaticamente pelo TypeORM

  @UpdateDateColumn()
  updatedAt: Date;  // Preenchido automaticamente pelo TypeORM

  @ManyToOne(() => User, { nullable: true, eager: true })  // Carrega o usuário criador automaticamente
  @JoinColumn({ name: 'createdBy' })
  criadoPor: User;  // Relacionamento com o usuário criador

  @ManyToOne(() => User, { nullable: true, eager: true })  // Carrega o usuário atualizador automaticamente
  @JoinColumn({ name: 'updatedBy' })
  atualizadoPor: User;  // Relacionamento com o usuário atualizador
}
