import { PrimaryGeneratedColumn, Column, Entity, OneToOne, OneToMany, Check, JoinTable } from 'typeorm';
import { Client } from './client';
import { Employee } from './employee';
import { Order } from './order';

@Entity('user')
@Check(`"role" = 'employee' OR  "role" = 'client'`)
export class User {

  @PrimaryGeneratedColumn('increment')
  idUser: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  nick: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'date' })
  registerDate: Date;

  @Column({ type: 'varchar' })
  role: string;

  // PK
  @OneToOne(type => Client, client => client.user)
  @JoinTable({
    name: 'client',
    joinColumn: {
      name: 'idUser',
      referencedColumnName: 'idUser',
    },
  })
  client: Client;

  @OneToOne(type => Employee, employee => employee.user)
  @JoinTable({
    name: 'employee',
    joinColumn: {
      name: 'idUser',
      referencedColumnName: 'idUser',
    },
  })
  employee: Employee;

  @OneToMany(type => Order, order => order.user)
  @JoinTable({
    name: 'idUser',
    joinColumn: {
      name: 'idUser',
      referencedColumnName: 'idUser',
    },
  })
  orders: Order[];

}
