import { User } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Index,
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

  @OneToMany(() => Member, (m: Member) => m.drawLot)
  members: Member[];
}

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => DrawLot, (d) => d.members)
  @JoinColumn()
  @Index()
  drawLot: DrawLot;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  email: string;
}
