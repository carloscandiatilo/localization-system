import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('audits')
export class Audit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column()
  accao: string;

  @Column({ type: 'text', nullable: true })
  detalhes: string | null;

  @CreateDateColumn()
  timestamp: Date;
}
