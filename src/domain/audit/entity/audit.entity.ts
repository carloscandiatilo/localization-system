import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('audits')
export class Audit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column()
  action: string;

  @Column({ type: 'text', nullable: true })
  details: string | null;   // ✅ Permitir null explicitamente

  @CreateDateColumn()
  timestamp: Date;
}
