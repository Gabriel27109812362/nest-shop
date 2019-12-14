import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderDetails } from './orderDetails';
import { Order } from './order';
import { Vat } from './vat';

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

  @ManyToOne(type => Vat, vat => vat.products)
  @JoinColumn({ name: 'idVat' })
  vat: Vat;

}
