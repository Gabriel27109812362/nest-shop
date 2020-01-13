import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { EmployeeService } from '../../services/employee/employee.service';
import { Response } from 'express';
import { CreateEmployeeDTO } from '../../DTO/employee/createEmployeeDTO';
import { EditEmployeeDTO } from '../../DTO/employee/editEmployeeDTO';
import { ConnectEmployeeWithUserDTO } from '../../DTO/employee/connectEmployeeWithUserDTO';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('employee')
@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {
  }

  @Get()
  async getAllEmployees(@Res() res: Response) {
    const value = await this.employeeService.getEmployeesQueryExec();
    res.json(value);
  }

  @ApiParam({ name: 'id', type: 'number', required: true, allowEmptyValue: false })
  @Get(':id')
  async getClientById(@Param() params, @Res() res: Response) {
    const { id } = params;
    const value = await this.employeeService.getEmployeeByIdQueryExec(id);
    !value ? res.sendStatus(404) : res.json(value);
  }

  @Post()
  async addNewEmployee(@Body() createEmployeeDTO: CreateEmployeeDTO, @Res() res: Response) {
    await this.employeeService.createEmployeeQueryExec(createEmployeeDTO);
    res.send('Employee has been created');
  }

  @ApiParam({ name: 'id', type: 'number', required: true, allowEmptyValue: false })
  @Delete(':id')
  async deleteEmployee(@Param() params, @Res() res: Response) {
    const { id } = params;
    await this.employeeService.deleteEmployeeQueryExec(id);
    res.send(`Employee ${id} has been deleted`);
  }

  @Patch('connectUser')
  async connectUser(@Body() connectUserDTO: ConnectEmployeeWithUserDTO, @Res() res: Response) {
    await this.employeeService.connectUserQueryExec(connectUserDTO);
    res.send(`Employee id:${connectUserDTO.idEmployee} connect with ${connectUserDTO.idUser} idUser`);

  }

  @ApiParam({ name: 'id', type: 'number', required: true, allowEmptyValue: false })
  @Patch(':id')
  async editEmployee(@Param() params, @Body() editEmployeeDTO: EditEmployeeDTO, @Res() res: Response) {
    const { id } = params;
    await this.employeeService.editEmployeeQueryExec(id, editEmployeeDTO);
    res.send(`Employee ${id} has been updated`);
  }

}
