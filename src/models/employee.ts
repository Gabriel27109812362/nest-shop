import { Column, Entity, JoinColumn, JoinTable, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';
import { EmployeeAddress } from './employeeAddress';

@Entity('employee')
export class Employee {

  @PrimaryGeneratedColumn('increment')
  idEmployee: number;

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

  @Column({ type: 'varchar' })
  position: string;

  @Column({ type: 'numeric' })
  salary: number;

  // PK
  @OneToOne(type => EmployeeAddress, employeeAddress => employeeAddress.employee)
  @JoinTable({
    name: 'employee_address',
    joinColumn: {
      name: 'idEmployee',
      referencedColumnName: 'idEmployee',
    },
  })
  employeeAddress: EmployeeAddress;

  // FK
  @OneToOne(type => User, user => user.employee)
  @JoinColumn({ name: 'idUser' })
  user: User;

}
