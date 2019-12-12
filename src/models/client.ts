import { Column, Entity, JoinColumn, JoinTable, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClientAddress } from './clientAddress';
import { User } from './user';

@Entity('client')
export class Client {
  @PrimaryGeneratedColumn('increment')
  idClient: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  surname: string;

  @Column({ type: 'varchar' })
  phoneNumber: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  pesel: string;
  // PK
  @OneToOne(type => ClientAddress, clientAddress => clientAddress.client)
  @JoinTable({
    name: 'client_address',
    joinColumn: {
      name: 'idClient',
      referencedColumnName: 'idClient',
    },
  })
  clientAddress: ClientAddress;
  // FK
  @OneToOne(type => User, user => user.client)
  @JoinColumn({ name: 'idUser' })
  user: User;

}
