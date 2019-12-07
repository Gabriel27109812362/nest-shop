import {PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Entity} from 'typeorm';
import {ClientPersonalData} from './clientPersonalData';

@Entity()
export class Client {

    @PrimaryGeneratedColumn('increment')
    idClient: number;

    @Column({type: 'varchar', nullable: false})
    nick: string;

    @Column({type: 'varchar', nullable: false})
    password: string;

    @Column({type: 'date', nullable: false})
    registerDate: Date;

    @OneToOne(type => ClientPersonalData, clientPersonalData => clientPersonalData.client)
    clientPersonalData: ClientPersonalData;
}
