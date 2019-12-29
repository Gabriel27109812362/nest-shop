import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { Client } from '../../models/client';
import { CreateClientDTO } from '../../DTO/client/createClientDTO';
import { EditClientDTO } from '../../DTO/client/editClientDTO';

@Injectable()
export class ClientService {

  private connection = getConnection();

  getClientsQueryExec() {
    return this.connection
      .createQueryBuilder()
      .select('client')
      .from(Client, 'client')
      .where('')
      .getMany();
  }

  getClientByIdQueryExec(id: number | string) {
    return this.connection
      .createQueryBuilder()
      .select('client')
      .from(Client, 'client')
      .where('client.idClient = :idClient', { idClient: Number(id) })
      .getOne();

  }

  createClientQuery(createClientDTO: CreateClientDTO) {
    return this.connection
      .createQueryBuilder()
      .insert()
      .into(Client)
      .values({
        name: createClientDTO.name,
        surname: createClientDTO.surname,
        phoneNumber: createClientDTO.phoneNumber,
        pesel: createClientDTO.pesel,
      });

  }

  deleteClientQuery(id: number | string) {
    return this.connection
      .createQueryBuilder()
      .delete()
      .from(Client)
      .where('idClient = :idClient', { idClient: Number(id) });

  }

  editClientQuery(id: number | string, changes: EditClientDTO) {
    return this.connection
      .createQueryBuilder()
      .update(Client)
      .set({ ...changes })
      .where('idClient = :idClient', { idClient: Number(id) });

  }

}
