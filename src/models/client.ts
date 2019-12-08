import {PrimaryGeneratedColumn, Column, Entity, OneToOne, OneToMany, JoinColumn} from 'typeorm';
import {ClientPersonalData} from './clientPersonalData';
import {Transaction} from './transaction';
import {Invoice} from './invoice';
import {Order} from './order';

@Entity('client')
export class Client {

    @JoinColumn({name: 'idClient'})
    @OneToOne(type => ClientPersonalData, clientPersonalData => clientPersonalData.client, {primary: true})
    clientPersonalData: ClientPersonalData;

    @Column({type: 'varchar', nullable: false})
    nick: string;

    @Column({type: 'varchar', nullable: false})
    password: string;

    @Column({type: 'date', nullable: false})
    registerDate: Date;

    @OneToMany(type => Transaction, transaction => transaction.client)
    transactions: Transaction[];

    @OneToMany(type => Invoice, invoice => invoice.client)
    invoices: Invoice[];

    @OneToMany(type => Order, order => order.client)
    orders: Order[];
}
