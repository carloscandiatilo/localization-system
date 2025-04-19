import { IsEmail, MinLength } from 'class-validator';
import { Role } from 'src/core/roles/entity/role.entity';
import { ValidationMessages } from 'src/shared/messages/validation-messages';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  @IsEmail({}, { message: ValidationMessages.EMAIL_INVALID })
  email: string;

  @MinLength(6, { message: ValidationMessages.PASSWORD_MIN_LENGTH })
  @Column()
  password: string;

  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role | null;

  get roleName(): string {
    return this.role ? this.role.name : this.username;
  }
}
