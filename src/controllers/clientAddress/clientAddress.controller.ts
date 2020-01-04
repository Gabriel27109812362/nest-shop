import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateAddressDTO } from '../../DTO/address/createAddressDTO';
import { ClientAddressService } from '../../services/client-address/client-address.service';
import { EditAddressDTO } from '../../DTO/address/editAddressDTO';
import { ConnectAddressWithClientDTO } from '../../DTO/address/connectAddressWithClientDTO';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('client-address')
@Controller('clientAddress')
export class ClientAddressController {

  constructor(private clientAddressService: ClientAddressService) {
  }

  @Get()
  async getAllClientAddresses(@Res() res: Response) {
    const value = await this.clientAddressService.getClientAddressesExec();
    res.json(value);
  }

  @ApiParam({ name: 'id', type: 'number', required: true, allowEmptyValue: false })
  @Get(':id')
  async getClientAddressById(@Param() params, @Res() res: Response) {
    const { id } = params;
    const value = await this.clientAddressService.getClientAddressByIdQueryExec(id);
    !value ? res.sendStatus(404) : res.json(value);
  }

  @Post()
  async addNewAddress(@Body() createAddressDTO: CreateAddressDTO, @Res() res: Response) {
    await this.clientAddressService.createClientAddressQueryExec(createAddressDTO);
    res.send('Address for client has been added');
  }

  @ApiParam({ name: 'id', type: 'number', required: true, allowEmptyValue: false })
  @Delete(':id')
  async deleteAddressById(@Param() params, @Res() res: Response) {
    const { id } = params;
    await this.clientAddressService.deleteClientAddressQueryExec(id);
    res.send(`Client Address ${id} has been deleted`);
  }

  @Patch('connectClient')
  async connectClient(@Body() connectClientDTO: ConnectAddressWithClientDTO, @Res() res: Response) {
    await this.clientAddressService.connectClientExec(connectClientDTO);
    res.send(`Address id: ${connectClientDTO.idAddress} has been connected with ${connectClientDTO.idClient} client`);
  }

  @ApiParam({ name: 'id', type: 'number', required: true, allowEmptyValue: false })
  @Patch(':id')
  async editClientAddress(@Param() params, @Body() editAddressDTO: EditAddressDTO, @Res() res: Response) {
    const { id } = params;
    await this.clientAddressService.editClientAddressQueryExec(id, editAddressDTO);
    res.send(`Client Address ${id} has been edited`);
  }

}
