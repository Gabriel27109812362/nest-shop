import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order';

@Entity('payment')
@Check(`"paymentMethod" = 'cash' OR "paymentMethod" = 'card' OR "paymentMethod" = 'transfer'`)
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
  paymentDate: Date;

  @Column({ type: 'varchar' })
  description: string;

  @ManyToOne(type => Order, order => order.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idOrder' })
  order: Order;

  setAmount(amount: number) {
    this.amount = amount;
    return this;
  }

  setPaymentStatus(paymentStatus: string) {
    this.paymentStatus = paymentStatus;
    return this;
  }

  setPaymentMethod(paymentMethod: 'card' | 'cash' | 'transfer') {
    this.paymentMethod = paymentMethod;
    return this;
  }

  setPaymentDate(date: Date) {
    this.paymentDate = date;
    return this;
  }

  setDescription(description: string) {
    this.description = description;
    return this;
  }

  setOrder(order: Order) {
    this.order = order;
    return this;
  }

}
