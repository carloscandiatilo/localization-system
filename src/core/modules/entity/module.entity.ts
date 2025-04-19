import {  Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('modules')
export class Module {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ type: 'boolean', nullable: true, default: false }) 
  isModule: boolean | null;

  @Column({ name: 'aggregateModule', nullable: true })
  aggregateModule?: number | null;

  @ManyToOne(() => Module, (module) => module.submodules, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'aggregateModule' })
  mainModule?: Module | null;

  @OneToMany(() => Module, (module) => module.mainModule, {
    cascade: true,
  })
  submodules: Module[];

  @Column({ default: false })
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
