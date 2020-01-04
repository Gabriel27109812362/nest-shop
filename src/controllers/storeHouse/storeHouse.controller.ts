import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { StoreHouseService } from '../../services/store-house/store-house.service';
import { Response } from 'express';
import { CreateStoreHouseDTO } from '../../DTO/storeHouse/createStoreHouseDTO';
import { EditStoreHouseDTO } from '../../DTO/storeHouse/editStoreHouseDTO';

@Controller('storeHouse')
export class StoreHouseController {
  constructor(private storeHouseService: StoreHouseService) {
  }

  @Get()
  async getAllStoreHousses(@Res() res: Response) {
    const value = await this.storeHouseService.getAllStoreHoussesQueryExec();
    res.json(value);
  }

  @Get(':id')
  async getStoreHouseById(@Param() params, @Res() res: Response) {
    const { id } = params;
    const value = await this.storeHouseService.getStoreHouseByIdQueryExec(id);
    res.json(value);
  }

  @Post()
  async addNewStorehouse(@Body() createStoreHouseDTO: CreateStoreHouseDTO, @Res() res: Response) {
    await this.storeHouseService.addNewStoreHouseQueryExec(createStoreHouseDTO);
    res.send('Storehouse has been created');
  }

  @Delete(':id')
  async deleteStorehouseById(@Param() params, @Res() res: Response) {
    const { id } = params;
    await this.storeHouseService.deleteStoreHouseByIdQueryExec(id);
    res.send(`StoreHouse ${id} has been deleted`);

  }

  @Patch(':id')
  async editStorehouseById(@Param() params, @Body() editStoreHouseDTO: EditStoreHouseDTO) {
    const { id } = params;
    await this.storeHouseService
      .editStoreHouseByIdQueryExec(id, editStoreHouseDTO);
  }

}
