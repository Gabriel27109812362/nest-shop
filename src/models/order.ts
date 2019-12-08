import {Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
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
    @JoinTable({
        name: 'invoice',
        joinColumn: {
            name: 'idOrder',
            referencedColumnName: 'idOrder',
        },
    })
    invoices: Invoice[];

    @ManyToOne(type => Client, client => client.orders)
    client: Client;

}
