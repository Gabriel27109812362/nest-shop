import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from 'typeorm';
import {Client} from './client';

@Entity()
export class ClientPersonalData {
    @PrimaryColumn({type: 'integer'})
    idClient: number;

    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'varchar'})
    surname: string;

    @Column({type: 'varchar'})
    address: string;

    @Column({type: 'varchar'})
    phoneNumber: string;

    @Column({type: 'varchar'})
    email: string;

    @OneToOne(type => Client, client => client.clientPersonalData)
    @JoinColumn()
    client: Client;
}
