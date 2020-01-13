import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { CreateUserDTO } from '../../DTO/user/createUserDTO';
import { Response } from 'express';
import { UserService } from '../../services/user/user.service';
import { EditUserDTO } from '../../DTO/user/editUserDTO';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {

  constructor(private userService: UserService) {
  }

  @Get()
  async getAllUsers(@Res() res: Response) {
    const value = await this.userService.getUsersQueryExec();
    res.json(value);
  }

  @ApiParam({ name: 'id', type: 'number', required: true, allowEmptyValue: false })
  @Get(':id')
  async getUserById(@Param() params, @Res() res: Response) {
    const { id } = params;
    const value = await this.userService.getUserByIdQueryExec(id);
    !value ? res.sendStatus(404) : res.json(value);
  }

  @Post()
  async addNewUser(@Body()createUserDTO: CreateUserDTO, @Res() res: Response) {
    await this.userService.createUserQueryExec(createUserDTO);
    res.send('user has been created');
  }

  @ApiParam({ name: 'id', type: 'number', required: true, allowEmptyValue: false })
  @Delete(':id')
  async deleteUser(@Param() params, @Res() res: Response) {
    const { id } = params;
    await this.userService.deleteUserQueryExec(id);
    res.send(`User ${id} has been deleted`);
  }

  @ApiParam({ name: 'id', type: 'number', required: true, allowEmptyValue: false })
  @Patch(':id')
  async editUser(@Param() params, @Body() editUserDTO: EditUserDTO, @Res() res: Response) {
    const { id } = params;
    await this.userService.editUserQueryExec(id, editUserDTO);
    res.send(`User ${id} has been edited`);
  }

}
