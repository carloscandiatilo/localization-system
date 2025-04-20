import { User } from 'src/core/user/entity/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm';
import { Country } from '../../country/entity/country.entity';

@Entity('province')
export class Province {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @OneToMany(() => User, user => user.role)
  users: User[];

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'country_id' })
  countryId: Country;

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
