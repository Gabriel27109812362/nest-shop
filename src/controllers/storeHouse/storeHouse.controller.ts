import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { StoreHouseService } from '../../services/store-house/store-house.service';
import { Response } from 'express';
import { CreateStoreHouseDTO } from '../../DTO/storeHouse/createStoreHouseDTO';
import { EditStoreHouseDTO } from '../../DTO/storeHouse/editStoreHouseDTO';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('storeHouse')
@Controller('storeHouse')
export class StoreHouseController {
  constructor(private storeHouseService: StoreHouseService) {
  }

  @Get()
  async getAllStoreHousses(@Res() res: Response) {
    const value = await this.storeHouseService.getAllStoreHoussesQueryExec();
    res.json(value);
  }

  @ApiParam({ name: 'id', type: 'number', required: true, allowEmptyValue: false })
  @Get(':id')
  async getStoreHouseById(@Param() params, @Res() res: Response) {
    const { id } = params;
    const value = await this.storeHouseService.getStoreHouseByIdQueryExec(id);
    !value ? res.sendStatus(404) : res.json(value);
  }

  @Post()
  async addNewStorehouse(@Body() createStoreHouseDTO: CreateStoreHouseDTO, @Res() res: Response) {
    await this.storeHouseService.addNewStoreHouseQueryExec(createStoreHouseDTO);
    res.send('Storehouse has been created');
  }

  @ApiParam({ name: 'id', type: 'number', required: true, allowEmptyValue: false })
  @Delete(':id')
  async deleteStorehouseById(@Param() params, @Res() res: Response) {
    const { id } = params;
    await this.storeHouseService.deleteStoreHouseByIdQueryExec(id);
    res.send(`StoreHouse ${id} has been deleted`);

  }

  @ApiParam({ name: 'id', type: 'number', required: true, allowEmptyValue: false })
  @Patch(':id')
  async editStorehouseById(@Param() params, @Body() editStoreHouseDTO: EditStoreHouseDTO, @Res() res: Response) {
    const { id } = params;
    await this.storeHouseService
      .editStoreHouseByIdQueryExec(id, editStoreHouseDTO);
    res.send(`Store ${id} has been updated`);
  }

}
