import { User } from 'src/core/auth/user/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, user => user.categorias, { nullable: false })
  @JoinColumn({ name: 'userId' }) 
  user: User;

  @Column({ default: false })
  isDeleted: boolean;
}
