import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { ClientService } from '../../services/client/client.service';
import { Response } from 'express';
import { CreateClientDTO } from '../../DTO/client/createClientDTO';
import { EditClientDTO } from '../../DTO/client/editClientDTO';

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
    await this.clientService.createClientQuery(createClientDTO).execute();
    res.send('Client has been created');
  }

  @Delete(':id')
  async deleteUser(@Param() params, @Res() res: Response) {
    const { id } = params;
    await this.clientService.deleteClientQuery(id).execute();
    res.send(`Client ${id} has been deleted`);
  }

  @Patch(':id')
  async editUser(@Param() params, @Body() editClientDTO: EditClientDTO, @Res() res: Response) {
    const { id } = params;
    await this.clientService.editClientQuery(id, editClientDTO).execute();
    res.send(`Client ${id} has been updated`);
  }



}
