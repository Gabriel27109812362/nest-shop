import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product';

@Entity('category')
export class Category {

  @PrimaryGeneratedColumn('increment')
  idCategory: number;

  @Column({ type: 'varchar' })
  name: string;

// relationship categories -> products (bi-directional)
  @ManyToMany(type => Product, product => product.categories)
  products: Product[];
//
}
