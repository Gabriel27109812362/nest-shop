import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product';

@Entity('store')
export class StoreHouse {

  @PrimaryGeneratedColumn('increment')
  idStoreHouse: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'numeric' })
  area: number;

  @Column({ type: 'numeric' })
  rentCost: number;
// relationship storeHouse -> products
  @OneToMany(type => Product, product => product.storeHouse)
  @JoinTable({
    name: 'product',
    joinColumn: {
      name: 'idStoreHouse',
      referencedColumnName: 'idStoreHouse',
    },
  })
  products: Product[];
//
}
