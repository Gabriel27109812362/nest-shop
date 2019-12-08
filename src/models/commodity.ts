import {Check, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {CommodityAmount} from './commodityAmount';
import {Invoice} from './invoice';

@Entity()
@Check(`"stockStatus" > 0`)
export class Commodity {

    @PrimaryGeneratedColumn('increment')
    idCommodity: number;

    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'numeric'})
    netCost: number;

    @Column({type: 'integer'})
    stockStatus: number;

    // Join Commodity table with CommodityAmount
    @OneToMany(type => CommodityAmount, commodityAmount => commodityAmount.commodity)
    commodityAmounts: CommodityAmount[];

    @ManyToMany(type => Invoice, invoice => invoice.commodities)
    invoices: Invoice[];

}
