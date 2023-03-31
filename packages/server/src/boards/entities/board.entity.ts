import { Todo } from 'src/todos/entities';
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

//* entities */
import { User } from '../../users/entities';

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  user: User;

  @OneToMany(() => Todo, (todo) => todo.id)
  todos: Todo[];

  @Column({
    type: 'text',
  })
  name: string;

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
