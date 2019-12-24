import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Res } from '@nestjs/common';
import { CreateUserDTO } from '../../DTO/createUserDTO';
import { Response } from 'express';
import { UserService } from '../../services/user/user.service';

@Controller('user')
export class UserController {

  constructor(private userService: UserService) {
  }

  @Get()
  async getAllUsers(@Res() res: Response) {
    const value = await this.userService.getUsersQueryExec();
    return res.json(value);
  }

  @Post()
  async addNewUser(@Body()createUserDTO: CreateUserDTO, @Res() res: Response) {
    await this.userService.createUserQuery(createUserDTO).execute();
    return res.send('User has been created');
  }

  @Delete(':id')
  async deleteUser(@Param() params, @Res() res: Response) {
    const { id } = params;
    await this.userService.deleteUserQuery(id).execute();
    return res.send(`User ${id} has been deleted`);
  }




}
