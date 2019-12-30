import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Res } from '@nestjs/common';
import { ClientService } from '../../services/client/client.service';
import { Response } from 'express';
import { CreateClientDTO } from '../../DTO/client/createClientDTO';
import { EditClientDTO } from '../../DTO/client/editClientDTO';
import { ConnectClientWithUserDTO } from '../../DTO/client/connectClientWithUserDTO';

@Controller('client')
export class ClientController {

  constructor(private clientService: ClientService) {

  }

  @Get()
  async getAllClients(@Res() res: Response) {
    const value = await this.clientService.getClientsQueryExec();
    res.json(value);
  }

  @Get(':id')
  async getClientById(@Param() params, @Res() res: Response) {
    const { id } = params;
    const value = await this.clientService.getClientByIdQueryExec(id);
    res.json(value);
  }

  @Post()
  async addNewClient(@Body() createClientDTO: CreateClientDTO, @Res() res: Response) {
    await this.clientService.createClientQueryExec(createClientDTO);
    res.send('Client has been created');
  }

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

  @Patch(':id')
  async editUser(@Param() params, @Body() editClientDTO: EditClientDTO, @Res() res: Response) {
    const { id } = params;
    await this.clientService.editClientQueryExec(id, editClientDTO);
    res.send(`Client ${id} has been updated`);
  }

}
