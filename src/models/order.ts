import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';
import { Payment } from './payment';
import { OrderDetails } from './orderDetails';
import { Product } from './product';

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
  @JoinColumn({ name: 'idUser' })
  user: User;

  @OneToMany(type => Payment, payment => payment.order)
  @JoinTable({
    name: 'payment',
    joinColumn: {
      name: 'idOrder',
      referencedColumnName: 'idOrder',
    },
  })
  payments: Payment[];
// relationship orders -> product via orderDetails junction table (bi-directional)
  @OneToMany(type => OrderDetails, orderDetails => orderDetails.order)
  orderDetails: OrderDetails[];

  @ManyToMany(type => Product, product => product.orders)
  @JoinTable({
    name: 'order_details',
    joinColumn: {
      name: 'idOrder',
      referencedColumnName: 'idOrder',
    },
    inverseJoinColumn: {
      name: 'idProduct',
      referencedColumnName: 'idProduct',
    },
  })
  products: Product[];
//
}
