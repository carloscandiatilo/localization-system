import { User } from 'src/core/user/entity/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @OneToMany(() => User, user => user.role)
  users: User[];

  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean;
}
