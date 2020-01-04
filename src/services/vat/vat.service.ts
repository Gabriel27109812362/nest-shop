import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { Vat } from '../../models/vat';
import { CreateEditVatDTO } from '../../DTO/vat/createEditVatDTO';

@Injectable()
export class VatService {

  private manager = getManager();

  getAllVatsQueryExec() {
    return this.manager
      .find(Vat, {});
  }

  getVatByIdQueryExec(id: number | string) {
    return this.manager
      .findOne(Vat, { idVat: Number(id) });
  }

  createNewVatQueryExec(createVatDTO: CreateEditVatDTO) {
    return this.manager
      .insert(Vat, { ...createVatDTO });
  }

  deleteVatByIdQueryExec(id: number | string) {
    return this.manager
      .delete(Vat, { idVat: Number(id) });
  }

  editVatByUserIdQueryExec(id: number | string, changes: CreateEditVatDTO) {
    return this.manager
      .update(Vat, { idVat: Number(id) }, { ...changes });
  }

}
