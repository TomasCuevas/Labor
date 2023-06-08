import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

//* entities */
import { Card } from '@/cards/entities';
import { User } from '@/users/entities';

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  user: User;

  @OneToMany(() => Card, (todo) => todo.id)
  cards: Card[];

  @Column({
    type: 'text',
  })
  name: string;

  @Column({
    type: 'text',
    default: '',
  })
  description: string;

  @Column({
    type: 'text',
    default: 'lightblue',
  })
  background: string;

  @Column({
    type: 'text',
    default: 'open',
  })
  status: 'open' | 'closed';

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
