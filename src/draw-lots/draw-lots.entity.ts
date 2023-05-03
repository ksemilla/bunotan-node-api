import { User } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class DrawLot {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  owner: User;

  @Column({ default: '' })
  name: string;
}

@Entity()
export class Member {
  @Column({ default: '' })
  name: string;
}
