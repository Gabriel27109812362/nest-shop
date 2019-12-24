import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../../DTO/createUserDTO';
import { getConnection } from 'typeorm';
import { User } from '../../models/user';

@Injectable()
export class UserService {

  private connection = getConnection();

  getUsersQueryExec() {
    const query = this.connection
      .createQueryBuilder()
      .select('user')
      .from(User, 'user').where('').getMany();

    return query;
  }

  createUserQuery(createUserDTO: CreateUserDTO) {
    const query = this.connection
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

    return query;
  }
}
