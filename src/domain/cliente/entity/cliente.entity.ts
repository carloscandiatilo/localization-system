import { User } from 'src/core/auth/user/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  primeiro_nome: string;

  @Column()
  ultimo_nome: string;

  @Column({ type: 'date', nullable: true })
  data_nascimento: Date;

  @Column()
  endereco: string;

  @Column({ nullable: true })
  telefone: string;

  @Column({ nullable: true })
  foto_perfil: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, user => user.clientes, { nullable: false })
  @JoinColumn({ name: 'userId' }) 
  user: User;

  @Column({ default: false })
  isDeleted: boolean;
}
