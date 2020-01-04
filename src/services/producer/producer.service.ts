import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { Producer } from '../../models/producer';
import { CreateProducerDTO } from '../../DTO/producer/createProducerDTO';
import { EditProducerDTO } from '../../DTO/producer/editProducerDTO';

@Injectable()
export class ProducerService {
  private manager = getManager();

  getAllProducersQueryExec() {
    return this.manager
      .find(Producer, {});
  }

  getProducerByIdQueryExec(id: number | string) {
    return this.manager
      .findOne(Producer, { idProducer: Number(id) });
  }

  addNewProducerQueryExec(createProducerDTO: CreateProducerDTO) {
    return this.manager
      .insert(Producer, { ...createProducerDTO });
  }

  deleteProducerQueryExec(id: number | string) {
    return this.manager
      .delete(Producer, { idProducer: Number(id) });
  }

  editProducerQueryExec(id: number | string, changes: EditProducerDTO) {
    return this.manager
      .update(Producer, { idProducer: Number(id) }, { ...changes });
  }

}
