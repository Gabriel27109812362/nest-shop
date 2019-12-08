import {PrimaryGeneratedColumn, Column, Entity, OneToOne, OneToMany} from 'typeorm';
import {ClientPersonalData} from './clientPersonalData';
import {Transaction} from './transaction';
import {Invoice} from './invoice';
import {Order} from './order';

@Entity()
export class Client {
    @PrimaryGeneratedColumn('increment') idClient: number;

    @Column({type: 'varchar', nullable: false})
    nick: string;

    @Column({type: 'varchar', nullable: false})
    password: string;

    @Column({type: 'date', nullable: false})
    registerDate: Date;

    @OneToOne(type => ClientPersonalData, clientPersonalData => clientPersonalData.client)
    clientPersonalData: ClientPersonalData;

    @OneToMany(type => Transaction, transaction => transaction.client)
    transactions: Transaction[];

    @OneToMany(type => Invoice, invoice => invoice.client)
    invoices: Invoice[];

    @OneToMany(type => Order, order => order.client)
    orders: Order[];
}
