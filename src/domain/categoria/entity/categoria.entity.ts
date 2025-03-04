import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;
  
  @Column({ default: null })
  userId: number;

  @Column({ default: false })
  isDeleted: boolean;
}
