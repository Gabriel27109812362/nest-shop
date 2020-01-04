import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from './product';
import { Producer } from './producer';

@Entity('product_producer')
export class ProductProducer {

  @ManyToOne(type => Product, product => product.productProducers, { primary: true })
  @JoinColumn({ name: 'idProduct' })
  product: Product;

  @ManyToOne(type => Producer, producer => producer.productProducers, { primary: true })
  @JoinColumn({ name: 'idProducer' })
  producer: Producer;

  @Column({ type: 'numeric' })
  price: number;

  // setters
  setProduct(product: Product) {
    this.product = product;
    return this;
  }

  setProducer(producer: Producer) {
    this.producer = producer;
    return this;
  }

  setPrice(price: number) {
    this.price = price;
    return this;
  }

}
