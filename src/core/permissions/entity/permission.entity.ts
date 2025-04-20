import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

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
