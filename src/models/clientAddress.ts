import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from './client';

@Entity('client_address')
export class ClientAddress {

  @PrimaryGeneratedColumn('increment')
  idAddress: number;

  @Column({ type: 'varchar' })
  town: string;

  @Column({ type: 'varchar' })
  province: string;

  @Column({ type: 'varchar' })
  postCode: string;

  @Column({ type: 'varchar' })
  street: string;

  @Column({ type: 'varchar', nullable: false })
  houseNumber: string;

  @Column({ type: 'integer', nullable: true })
  flatNumber: string;

  @OneToOne(type => Client, client => client.clientAddress)
  @JoinColumn({ name: 'idClient' })
  client: Client;
}
