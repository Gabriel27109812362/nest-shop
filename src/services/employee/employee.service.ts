import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { Employee } from '../../models/employee';
import { CreateEmployeeDTO } from '../../DTO/employee/createEmployeeDTO';
import { EditEmployeeDTO } from '../../DTO/employee/editEmployeeDTO';
import { ConnectEmployeeWithUserDTO } from '../../DTO/employee/connectEmployeeWithUserDTO';
import { User } from '../../models/user';

@Injectable()
export class EmployeeService {

  private manager = getManager();

  getEmployeesQueryExec() {
    return this.manager
      .find(Employee, {});
  }

  getEmployeeByIdQueryExec(id: number | string) {
    return this.manager.findOne(Employee, { idEmployee: Number(id) });
  }

  createEmployeeQueryExec(createEmployeeDTO: CreateEmployeeDTO) {
    return this.manager
      .insert(Employee, { ...createEmployeeDTO });

  }

  deleteEmployeeQueryExec(id: number | string) {
    return this.manager
      .delete(Employee, { idEmployee: Number(id) });
  }

  editEmployeeQueryExec(id: number | string, changes: EditEmployeeDTO) {
    return this.manager
      .update(Employee, { idEmployee: Number(id) }, { ...changes });

  }

  async connectUserQueryExec(connectUserDTO: ConnectEmployeeWithUserDTO) {
    const user = await this.manager
      .findOne(User, connectUserDTO.idUser);

    const employee = await this.manager
      .findOne(Employee, connectUserDTO.idEmployee);

    employee.user = user;
    await this.manager.save(employee);
  }

}
