import { Body, Controller, Post, Res } from '@nestjs/common';
import { ClientService } from '../../services/client/client.service';
import { Response } from 'express';

@Controller('client')
export class ClientController {

  constructor(private clientService: ClientService) {
  }

  @Post()
  async addNewClient(@Body()createClientDTO: CreateClientDTO, @Res() res: Response) {
    await this.clientService.createClientQuery(createClientDTO).execute();
    res.send('Client has been created');
  }

}
