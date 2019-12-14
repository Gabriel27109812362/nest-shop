import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderDetails } from './orderDetails';
import { Order } from './order';
import { Vat } from './vat';
import { Category } from './category';
import { StoreHouse } from './storeHouse';
import { Producer } from './producer';
import { ProductProducer } from './productProducer';

@Entity('product')
export class Product {

  @PrimaryGeneratedColumn('increment')
  idProduct: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'integer' })
  magazineState: number;

  @Column({ type: 'varchar' })
  unitOfMeasure: string;

  @ManyToOne(type => Vat, vat => vat.products)
  @JoinColumn({ name: 'idVat' })
  vat: Vat;

  @ManyToOne(type => StoreHouse, store => store.products)
  @JoinColumn({ name: 'idStoreHouse' })
  storeHouse: StoreHouse;
// relationship products -> orders via orderDetails junction table (bi-directional)
  @OneToMany(type => OrderDetails, orderDetails => orderDetails.product)
  orderDetails: OrderDetails[];

  @ManyToMany(type => Order, order => order.products)
  orders: Order;
//
// relationship products -> producers via productProducer junction table (bi-directional)
  @OneToMany(type => ProductProducer, productProducer => productProducer.product)
  productProducers: ProductProducer[];

  @ManyToMany(type => Producer, producer => producer.products)
  @JoinTable({
    name: 'product_producer',
    joinColumn: {
      name: 'idProduct',
      referencedColumnName: 'idProduct',
    },
    inverseJoinColumn: {
      name: 'idProducer',
      referencedColumnName: 'idProducer',
    },
  })
  producers: Producer[];
//
// relationship products -> categories (bi-directional)
  @ManyToMany(type => Category, category => category.products)
  @JoinTable({
    name: 'product_category',
    joinColumn: {
      name: 'idProduct',
      referencedColumnName: 'idProduct',
    },
    inverseJoinColumn: {
      name: 'idCategory',
      referencedColumnName: 'idCategory',
    },
  })
  categories: Category[];
//
}
