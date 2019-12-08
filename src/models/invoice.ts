import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Transaction} from './transaction';
import {Client} from './client';
import {Order} from './order';
import {Commodity} from './commodity';
import {CommodityAmount} from './commodityAmount';

@Entity()
export class Invoice {
    @PrimaryGeneratedColumn('increment')
    idInvoice: number;

    @Column({type: 'numeric'})
    vatTax: number;

    @Column({type: 'numeric'})
    deliveryCost: number;

    @Column({type: 'numeric'})
    netCost: number;

    @OneToMany(type => Transaction, transaction => transaction.invoice)
    transactions: Transaction[];

    @ManyToOne(type => Client, client => client.invoices)
    @JoinColumn()
    client: Client;

    @ManyToOne(type => Order, order => order.invoices)
    @JoinColumn()
    order: Order;

    // Join Invoice table with CommodityAmount

    @OneToMany(type => CommodityAmount, commodityAmount => commodityAmount.invoice)
    commodityAmounts: CommodityAmount[];

    @ManyToMany(type => Commodity, commodity => commodity.invoices)
    @JoinTable({
        name: 'invoice_commodity',
        joinColumn: {
            name: 'id_invoice',
            referencedColumnName: 'idInvoice',
        },
        inverseJoinColumn: {
            name: 'id_commodity',
            referencedColumnName: 'idCommodity',
        },
    })
    commodities: Commodity[];
}
