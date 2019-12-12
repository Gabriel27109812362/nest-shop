import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order';

@Entity('payment')
export class Payment {

  @PrimaryGeneratedColumn('increment')
  idPayment: number;

  @Column({ type: 'numeric' })
  amount: number;

  @Column({ type: 'varchar' })
  paymentStatus: string;

  @Column({ type: 'varchar' })
  paymentMethod: string;

  @Column({ type: 'date' })
  paymentStartDate: Date;

  @Column({ type: 'date' })
  paymentEndDate: Date;

  @Column({ type: 'varchar' })
  description: string;

  @ManyToOne(type => Order, order => order.payments)
  @JoinColumn({ name: 'idOrder' })
  order: Order;

}
