import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { Client } from '../../models/client';
import { CreateClientDTO } from '../../DTO/client/createClientDTO';

@Injectable()
export class ClientService {

  private connection = getConnection();

  getClientsQueryExec() {

  }

  getClientByIdQueryExec() {

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

  deleteClientQuery() {

  }

  editClientQuery() {

  }

}
