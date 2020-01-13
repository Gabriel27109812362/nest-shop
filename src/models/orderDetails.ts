import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Order } from './order';
import { Product } from './product';

@Entity('order_details')
export class OrderDetails {

  @ManyToOne(type => Order, order => order.orderDetails, { primary: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idOrder' })
  order: Order;

  @ManyToOne(type => Product, product => product.orderDetails, { primary: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idProduct' })
  product: Product;

  @Column({ type: 'integer' })
  amount: number;

  setOrder(order: Order) {
    this.order = order;
    return this;
  }

  setProduct(product: Product) {
    this.product = product;
    return this;
  }

  setAmount(amount: number) {
    this.amount = amount;
    return this;
  }

}
