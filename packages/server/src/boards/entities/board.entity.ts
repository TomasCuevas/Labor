import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

//* entities */
import { User } from '../../users/entities';

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  user: User;

  @Column({
    type: 'text',
  })
  name: string;

  @Column({
    type: 'text',
    default: 'open',
  })
  status: string;
}
