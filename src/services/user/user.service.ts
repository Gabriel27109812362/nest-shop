import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../../DTO/user/createUserDTO';
import { getConnection } from 'typeorm';
import { User } from '../../models/user';
import { EditUserDTO } from '../../DTO/user/editUserDTO';

@Injectable()
export class UserService {

  private connection = getConnection();

  getUsersQueryExec() {
    return this.connection
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('')
      .getMany();
  }

  getUserByIdQueryExec(id: number | string) {
    return this.connection
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.idUser = :idUser', { idUser: Number(id) })
      .getOne();
  }

  createUserQuery(createUserDTO: CreateUserDTO) {
    return this.connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          login: createUserDTO.login,
          password: createUserDTO.password,
          registerDate: new Date(Date.now()).toDateString(),
          email: createUserDTO.email,
          role: createUserDTO.role,
        },
      ]);
  }

  deleteUserQuery(id: number | string) {
    return this.connection
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('idUser = :idUser', { idUser: Number(id) });
  }

  editUserQuery(id: number | string, changes: EditUserDTO) {
    return this.connection
      .createQueryBuilder()
      .update(User)
      .set({ ...changes })
      .where('idUser = :idUser', { idUser: Number(id) });
  }
}
