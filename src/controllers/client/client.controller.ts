import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Res } from '@nestjs/common';
import { ClientService } from '../../services/client/client.service';
import { Response } from 'express';
import { CreateClientDTO } from '../../DTO/client/createClientDTO';
import { EditClientDTO } from '../../DTO/client/editClientDTO';
import { ConnectClientWithUserDTO } from '../../DTO/client/connectClientWithUserDTO';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('client')
@Controller('client')
export class ClientController {

  constructor(private clientService: ClientService) {
  }

  @Get()
  async getAllClients(@Res() res: Response) {
    const value = await this.clientService.getClientsQueryExec();
    res.json(value);
  }

  @ApiParam({ name: 'id', type: 'number', required: true, allowEmptyValue: false })
  @Get(':id')
  async getClientById(@Param() params, @Res() res: Response) {
    const { id } = params;
    const value = await this.clientService.getClientByIdQueryExec(id);
    !value ? res.sendStatus(404) : res.json(value);
  }

  @Post()
  async addNewClient(@Body() createClientDTO: CreateClientDTO, @Res() res: Response) {
    await this.clientService.createClientQueryExec(createClientDTO);
    res.send('Client has been created');
  }

  @ApiParam({ name: 'id', type: 'number', required: true, allowEmptyValue: false })
  @Delete(':id')
  async deleteUser(@Param() params, @Res() res: Response) {
    const { id } = params;
    await this.clientService.deleteClientQueryExec(id);
    res.send(`Client ${id} has been deleted`);
  }

  @Patch('connectUser')
  async connectUser(@Body() connectUserDTO: ConnectClientWithUserDTO, @Res() res: Response) {
    await this.clientService.connectUserQueryExec(connectUserDTO);
    res.send(`Client id:${connectUserDTO.idClient} connect with ${connectUserDTO.idUser} idUser`);
  }

  @ApiParam({ name: 'id', type: 'number', required: true, allowEmptyValue: false })
  @Patch(':id')
  async editUser(@Param() params, @Body() editClientDTO: EditClientDTO, @Res() res: Response) {
    const { id } = params;
    await this.clientService.editClientQueryExec(id, editClientDTO);
    res.send(`Client ${id} has been updated`);
  }

}
