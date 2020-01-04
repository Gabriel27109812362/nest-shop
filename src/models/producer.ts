import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product';
import { ProductProducer } from './productProducer';

@Entity('producer')
export class Producer {

  @PrimaryGeneratedColumn('increment')
  idProducer: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  phoneNumber: string;
// relationship producers -> products via productProducer junction table (bi-directional)
  @OneToMany(type => ProductProducer, productProducer => productProducer.producer)
  productProducers: ProductProducer[];

  @ManyToMany(type => Product, product => product.producers)
  products: Product[];

}
