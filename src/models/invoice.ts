import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Invoice {
    @PrimaryGeneratedColumn('increment')
    invoiceId: number;

    @Column({type: 'numeric'})
    vatTax: number;

    @Column({type: 'numeric'})
    deliveryCost: number;

    

}
