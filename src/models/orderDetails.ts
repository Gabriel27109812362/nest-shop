import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Order } from './order';
import { Product } from './product';

@Entity('order_details')
export class OrderDetails {

  @ManyToOne(type => Order, order => order.orderDetails, { primary: true })
  @JoinColumn({ name: 'idOrder' })
  order: Order;

  @ManyToOne(type => Product, product => product.orderDetails, { primary: true })
  @JoinColumn({ name: 'idProduct' })
  product: Product;

  @Column({ type: 'numeric' })
  amount: number;
}
