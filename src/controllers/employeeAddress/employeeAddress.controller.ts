import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { EmployeeAddressService } from '../../services/employee-address/employee-address.service';
import { Response } from 'express';
import { CreateAddressDTO } from '../../DTO/address/createAddressDTO';
import { EditAddressDTO } from '../../DTO/address/editAddressDTO';
import { ConnectAddressWithEmployeeDTO } from '../../DTO/address/connectAddressWithEmployeeDTO';

@Controller('employeeAddress')
export class EmployeeAddressController {

  constructor(private employeeAddressService: EmployeeAddressService) {
  }

  @Get()
  async getAllEmployeeAddresses(@Res() res: Response) {
    const value = await this.employeeAddressService.getEmployeeAddressExec();
    res.json(value);
  }

  @Get(':id')
  async getEmployeeAddressById(@Param() params, @Res() res: Response) {
    const { id } = params;
    const value = await this.employeeAddressService.getEmployeeAddressByIdQueryExec(id);
    res.json(value);
  }

  @Post()
  async addNewEmployee(@Body() createAddressDTO: CreateAddressDTO, @Res() res: Response) {
    await this.employeeAddressService.createEmployeeAddressQueryExec(createAddressDTO);
    res.send('Address for employee has been added');
  }

  @Delete(':id')
  async deleteAddressById(@Param() params, @Res() res: Response) {
    const { id } = params;
    await this.employeeAddressService.deleteEmployeeAddressQueryExec(id);
    res.send(`Employee ${id} has been deleted`);
  }

  @Patch('connectEmployee')
  async connectEmployee(@Body() connectEmployeeDTO: ConnectAddressWithEmployeeDTO, @Res() res: Response) {
    await this.employeeAddressService.connectEmployeeExec(connectEmployeeDTO);
    res.send(`Address ${connectEmployeeDTO.idAddress} has been connected with ${connectEmployeeDTO.idEmployee} employee`);
  }

  @Patch(':id')
  async editEmployeeAddress(@Param() params, @Body() editAddressDTO: EditAddressDTO, @Res() res: Response) {
    const { id } = params;
    await this.employeeAddressService.editClientAddressQueryExec(id, editAddressDTO);
    res.send(`Employee Address ${id} has been edited`);
  }

}


