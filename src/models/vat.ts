import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product';

@Entity('vat')
export class Vat {

  @PrimaryGeneratedColumn('increment')
  idVat: number;

  @Column({ type: 'numeric' })
  value: number;

  @OneToMany(type => Product, product => product.vat)
  @JoinTable({
    name: 'product',
    joinColumn: {
      name: 'idVat',
      referencedColumnName: 'idVat',
    },
  })
  products: Product[];

}
