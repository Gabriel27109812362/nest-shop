import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Invoice} from './invoice';
import {Client} from './client';

@Entity()
export class Order {

    @PrimaryGeneratedColumn('increment')
    idOrder: number;

    @Column({type: 'date'})
    orderDate: Date;

    @Column({type: 'numeric'})
    totalCost: number;

    @OneToMany(type => Invoice, invoice => invoice.order)
    invoices: Invoice[];
    @ManyToOne(type => Client, client => client.orders)
    client: Client;


}
