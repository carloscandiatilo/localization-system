import { Categoria } from 'src/domain/categoria/entity/categoria.entity';
import { Cliente } from 'src/domain/cliente/entity/cliente.entity';
import { Role } from 'src/domain/role/entity/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isDeleted: boolean;

  @OneToMany(() => Categoria, (categoria) => categoria.user)
  categorias: Categoria[];

  @OneToMany(() => Cliente, (cliente) => cliente.user)
  clientes: Cliente[];

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'roleId' })
  role: Role;
}
