import { User } from 'src/core/user/entity/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('doc-types')
export class DocType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  mask: string;

  @Column({ default: '' })
  description: string;

  @OneToMany(() => User, user => user.role)
  users: User[];

  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean;

  @Column({ nullable: true })
  createdBy?: number;

  @Column({ nullable: true })
  updatedBy?: number;

  @CreateDateColumn({ type: 'timestamp', precision: 6 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', precision: 6 })
  updatedAt: Date;

}