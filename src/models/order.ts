import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';

@Entity('order')
export class Order {

  @PrimaryGeneratedColumn('increment')
  idOrder: number;

  @Column({ type: 'date' })
  dateOrder: Date;

  @ManyToOne(type => User, user => user.orders)
  user: User;

}
