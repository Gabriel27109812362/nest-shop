import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';
import { Payment } from './payment';

@Entity('order')
export class Order {

  @PrimaryGeneratedColumn('increment')
  idOrder: number;

  @Column({ type: 'date' })
  dateOrder: Date;

  @Column({ type: 'date' })
  executionDeadline: Date;

  @Column({ type: 'varchar' })
  orderStatus: string;

  @ManyToOne(type => User, user => user.orders)
  user: User;

  @OneToMany(type => Payment, payment => payment.order)
  payments: Payment[];
}
