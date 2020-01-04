import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { StoreHouse } from '../../models/storeHouse';
import { CreateStoreHouseDTO } from '../../DTO/storeHouse/createStoreHouseDTO';
import { EditStoreHouseDTO } from '../../DTO/storeHouse/editStoreHouseDTO';

@Injectable()
export class StoreHouseService {

  private manager = getManager();

  getAllStoreHoussesQueryExec() {
    return this.manager
      .find(StoreHouse, {});
  }

  getStoreHouseByIdQueryExec(id: number | string) {
    return this.manager
      .findOne(StoreHouse, { idStoreHouse: Number(id) });
  }

  addNewStoreHouseQueryExec(createStoreHouseDTO: CreateStoreHouseDTO) {
    return this.manager
      .insert(StoreHouse, { ...createStoreHouseDTO });
  }

  deleteStoreHouseByIdQueryExec(id: number | string) {
    return this.manager
      .delete(StoreHouse, { idStoreHouse: Number(id) });
  }

  editStoreHouseByIdQueryExec(id: number | string, changes: EditStoreHouseDTO) {
    return this.manager
      .update(StoreHouse, { idStoreHouse: Number(id) }, { ...changes });
  }

}
