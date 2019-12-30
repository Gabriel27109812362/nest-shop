import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { EmployeeAddress } from '../../models/employeeAddress';
import { CreateAddressDTO } from '../../DTO/address/createAddressDTO';
import { EditAddressDTO } from '../../DTO/address/editAddressDTO';
import { ConnectAddressWithEmployeeDTO } from '../../DTO/address/connectAddressWithEmployeeDTO';
import { Employee } from '../../models/employee';

@Injectable()
export class EmployeeAddressService {

  private manager = getManager();

  getEmployeeAddressExec() {
    return this.manager
      .find(EmployeeAddress, {});
  }

  getEmployeeAddressByIdQueryExec(id: number | string) {
    return this.manager
      .findOne(EmployeeAddress, { idAddress: Number(id) });
  }

  createEmployeeAddressQueryExec(createAddressDTO: CreateAddressDTO) {
    return this.manager
      .insert(EmployeeAddress, {
        ...createAddressDTO,
      });
  }

  deleteEmployeeAddressQueryExec(id: number | string) {
    return this.manager
      .delete(EmployeeAddress, { idAddress: Number(id) });
  }

  editClientAddressQueryExec(id: number | string, changes: EditAddressDTO) {
    return this.manager
      .update(EmployeeAddress, { idAddress: Number(id) }, { ...changes });
  }

  async connectEmployeeExec(connectEmployeeDTO: ConnectAddressWithEmployeeDTO) {
    const employee = await this.manager
      .findOne(Employee, { idEmployee: connectEmployeeDTO.idEmployee });

    const address = await this.manager
      .findOne(EmployeeAddress, { idAddress: connectEmployeeDTO.idAddress });

    address.employee = employee;
    await this.manager.save(address);
  }

}
