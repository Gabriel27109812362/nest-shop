import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Res } from '@nestjs/common';
import { CreateUserDTO } from '../../DTO/user/createUserDTO';
import { Response } from 'express';
import { UserService } from '../../services/user/user.service';
import { EditUserDTO } from '../../DTO/user/editUserDTO';

@Controller('user')
export class UserController {

  constructor(private userService: UserService) {
  }

  @Get()
  async getAllUsers(@Res() res: Response) {
    const value = await this.userService.getUsersQueryExec();
    res.json(value);
  }

  @Get(':id')
  async getUserById(@Param() params, @Res() res: Response) {
    const { id } = params;
    const value = await this.userService.getUserByIdQueryExec(id);
    res.json(value);
  }

  @Post()
  async addNewUser(@Body()createUserDTO: CreateUserDTO, @Res() res: Response) {
    await this.userService.createUserQuery(createUserDTO).execute();
    res.send('user has been created');
  }

  @Delete(':id')
  async deleteUser(@Param() params, @Res() res: Response) {
    const { id } = params;
    await this.userService.deleteUserQuery(id).execute();
    res.send(`User ${id} has been deleted`);
  }

  @Put(':id')
  async editUser(@Param() params, @Body() editUserDTO: EditUserDTO, @Res() res: Response) {
    const { id } = params;
    await this.userService.editUserQuery(id, editUserDTO).execute();
    res.send(`User ${id} has been edited`);
  }

}
