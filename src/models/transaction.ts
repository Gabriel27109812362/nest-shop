import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {TransactionStatus} from '../types/transactionStatus';
import {PayMethod} from '../types/payMethod';
import {Invoice} from './invoice';
import {Client} from './client';

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn('increment')
    idTransaction: number;

    @Column({type: 'varchar'})
    status: TransactionStatus;

    @Column({type: 'date'})
    transactionDate: Date;

    @Column({type: 'varchar'})
    payMethod: PayMethod;

    @Column({type: 'numeric'})
    value: number;

    @ManyToOne(type => Invoice, invoice => invoice.transactions)
    @JoinColumn()
    invoice: Invoice;

    @ManyToOne(type => Client, client => client.transactions)
    @JoinColumn()
    client: Client;
}
