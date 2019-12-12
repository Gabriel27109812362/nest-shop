import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderDetails } from './orderDetails';
import { Order } from './order';

@Entity('product')
export class Product {

  @PrimaryGeneratedColumn('increment')
  idProduct: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ type: 'integer' })
  magazineState: number;

  @Column({ type: 'varchar' })
  unitOfMeasure: string;

  @OneToMany(type => OrderDetails, orderDetails => orderDetails.product)
  orderDetails: OrderDetails[];

  @ManyToMany(type => Order, order => order.products)
  orders: Order;

}
