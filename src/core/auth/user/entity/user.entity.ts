import { Categoria } from 'src/domain/categoria/entity/categoria.entity';
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

  @Column({ default: false })
  isDeleted: boolean;
}
