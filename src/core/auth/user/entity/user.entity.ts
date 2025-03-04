import { Categoria } from 'src/domain/categoria/entity/categoria.entity';
import { Cliente } from 'src/domain/cliente/entity/cliente.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @Column({ default: null })
  roleId: number;

  @OneToMany(() => Categoria, categoria => categoria.user)
  categorias: Categoria[];

  @OneToMany(() => Cliente, cliente => cliente.user)
  clientes: Cliente[];

  @Column({ default: false })
  isDeleted: boolean;
}
