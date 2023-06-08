import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

//* entities *//
import { Board } from '@/boards/entities';
import { User } from '@/users/entities';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  user: User;

  @ManyToOne(() => Board, (board) => board.id, { eager: true })
  board: Board;

  @Column({
    type: 'text',
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'text',
    default: 'pending',
  })
  status: 'pending' | 'in-progress' | 'completed';

  @Column({
    type: 'text',
    array: true,
    default: [],
  })
  labels: string[];

  @Column({
    type: 'numeric',
    default: new Date().getTime(),
  })
  lastUpdate: number;

  @BeforeUpdate()
  updateLastUpdate() {
    this.lastUpdate = new Date().getTime();
  }
}
