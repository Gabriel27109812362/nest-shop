import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../../DTO/user/createUserDTO';
import { getManager } from 'typeorm';
import { User } from '../../models/user';
import { EditUserDTO } from '../../DTO/user/editUserDTO';

@Injectable()
export class UserService {

  private manager = getManager();

  getUsersQueryExec() {
    return this.manager
      .find(User, {});
  }

  getUserByIdQueryExec(id: number | string) {
    return this.manager
      .findOne(User, { idUser: Number(id) });
  }

  createUserQueryExec(createUserDTO: CreateUserDTO) {
    return this.manager
      .insert(User, {
        ...createUserDTO,
        registerDate: new Date(Date.now()).toDateString(),
      });
  }

  deleteUserQueryExec(id: number | string) {
    return this.manager
      .delete(User, { idUser: Number(id) });
  }

  editUserQueryExec(id: number | string, changes: EditUserDTO) {
    return this.manager
      .update(User, { idUser: Number(id) }, { ...changes });
  }
}
