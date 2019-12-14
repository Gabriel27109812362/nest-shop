import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from './employee';

@Entity('employee_address')
export class EmployeeAddress {

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

  @OneToOne(type => Employee, employee => employee.employeeAddress)
  @JoinColumn({ name: 'idEmployee' })
  employee: Employee;

}
