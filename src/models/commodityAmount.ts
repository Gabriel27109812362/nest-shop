import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn} from 'typeorm';
import {Commodity} from './commodity';
import {Invoice} from './invoice';

@Entity('invoice_commodity')
export class CommodityAmount {

    @Column({type: 'integer'})
    amount: number;

    @JoinColumn({name: 'id_invoice'})
    @ManyToOne(type => Invoice, invoice => invoice.commodityAmounts, {primary: true})
    invoice: Invoice;

    @JoinColumn({name: 'id_commodity'})
    @ManyToOne(type => Commodity, commodity => commodity.commodityAmounts, {primary: true})
    commodity: Commodity;

}
