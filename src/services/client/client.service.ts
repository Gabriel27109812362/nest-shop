import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { Client } from '../../models/client';
import { CreateClientDTO } from '../../DTO/client/createClientDTO';
import { EditClientDTO } from '../../DTO/client/editClientDTO';
import { ConnectClientWithUserDTO } from '../../DTO/client/connectClientWithUserDTO';
import { User } from '../../models/user';

@Injectable()
export class ClientService {

  private manager = getManager();

  getClientsQueryExec() {
    return this.manager
      .find(Client, {});
  }

  getClientByIdQueryExec(id: number | string) {
    return this.manager
      .findOne(Client, { idClient: Number(id) });
  }

  createClientQueryExec(createClientDTO: CreateClientDTO) {
    return this.manager
      .insert(Client, {
        ...createClientDTO,
      });
  }

  deleteClientQueryExec(id: number | string) {
    return this.manager
      .delete(Client, { idClient: Number(id) });
  }

  editClientQueryExec(id: number | string, changes: EditClientDTO) {
    return this.manager
      .update(Client, { idClient: Number(id) }, { ...changes });
  }

  async connectUserQueryExec(connectUserDTO: ConnectClientWithUserDTO) {
    const user = await this.manager
      .findOne(User, connectUserDTO.idUser);

    const client = await this.manager
      .findOne(Client, connectUserDTO.idClient);

    client.user = user;
    await this.manager.save(client);
  }

}
