import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../../DTO/createUserDTO';
import { getConnection } from 'typeorm';
import { User } from '../../models/user';

@Injectable()
export class UserService {

  private connection = getConnection();

  getUsersQueryExec() {
    return this.connection
      .createQueryBuilder()
      .select('user')
      .from(User, 'user').where('').getMany();
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
          role: createUserDTO.role,
        },
      ]);
  }

  deleteUserQuery(id: number | string) {

    const query = this.connection
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('idUser = :idUser', { idUser: Number(id) });

    return query;

  }

}
