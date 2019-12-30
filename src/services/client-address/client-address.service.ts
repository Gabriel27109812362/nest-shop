import { Injectable } from '@nestjs/common';
import { CreateAddressDTO } from '../../DTO/address/createAddressDTO';
import { getManager } from 'typeorm';
import { ClientAddress } from '../../models/clientAddress';
import { EditAddressDTO } from '../../DTO/address/editAddressDTO';
import { Client } from '../../models/client';
import { ConnectAddressWithClientDTO } from '../../DTO/address/connectAddressWithClientDTO';

@Injectable()
export class ClientAddressService {

  private manager = getManager();

  getClientAddressesExec() {
    return this.manager
      .find(ClientAddress, {});
  }

  getClientAddressByIdQueryExec(id: number | string) {
    return this.manager
      .findOne(ClientAddress, { idAddress: Number(id) });
  }

  createClientAddressQueryExec(createAddressDTO: CreateAddressDTO) {
    return this.manager
      .insert(ClientAddress, {
        ...createAddressDTO,
      });
  }

  deleteClientAddressQueryExec(id: number | string) {
    return this.manager
      .delete(ClientAddress, { idAddress: Number(id) });
  }

  editClientAddressQueryExec(id: number | string, changes: EditAddressDTO) {
    return this.manager
      .update(ClientAddress, { idAddress: Number(id) }, { ...changes });
  }

  async connectClientExec(connectClientDTO: ConnectAddressWithClientDTO) {
    const client = await this.manager
      .findOne(Client, { idClient: connectClientDTO.idClient });

    const address = await this.manager
      .findOne(ClientAddress, { idAddress: connectClientDTO.idAddress });

    address.client = client;
    await this.manager.save(address);
  }

}
