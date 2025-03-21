import { User } from 'src/core/auth/user/entity/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ default: '' })
  descricao: string;

  @OneToMany(() => User, user => user.role)
  users: User[];

  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean;
}
