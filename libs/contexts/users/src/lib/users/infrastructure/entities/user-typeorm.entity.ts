import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserPrimitive } from '../../domain/primitives/user.primitive';

@Entity('users')
export class UserTypeormEntity implements UserPrimitive {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50 })
  name!: string;

  @Column({ type: 'varchar', length: 100 })
  email!: string;

  @Column({ type: 'varchar', length: 100 })
  password!: string;

  @CreateDateColumn()
  ctime!: string;

  @UpdateDateColumn()
  mtime!: string;
}
