import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { VatService } from '../../services/vat/vat.service';
import { Response } from 'express';
import { CreateEditVatDTO } from '../../DTO/vat/createEditVatDTO';

@Controller('vat')
export class VatController {

  constructor(private vatService: VatService) {
  }

  @Get()
  async getAllVats(@Res() res: Response) {
    const value = await this.vatService.getAllVatsQueryExec();
    res.json(value);
  }

  @Get(':id')
  async getVatById(@Param() params, @Res() res: Response) {
    const { id } = params;
    const value = await this.vatService.getVatByIdQueryExec(id);
    res.send(value);
  }

  @Post()
  async addNewVat(@Body() createVatDTO: CreateEditVatDTO, @Res() res: Response) {
    await this.vatService.createNewVatQueryExec(createVatDTO);
    res.send('Vat has been created');
  }

  @Delete(':id')
  async deleteVatById(@Param() params, @Res() res: Response) {
    const { id } = params;
    await this.vatService.deleteVatByIdQueryExec(id);
    res.send(`Vat ${id} has been deleted`);
  }

  @Patch(':id')
  async editVatById(@Param() params, @Body() editVatDTO: CreateEditVatDTO, @Res() res: Response) {
    const { id } = params;
    await this.vatService.editVatByUserIdQueryExec(id, editVatDTO);
    res.json(`Vat ${id} has been changed`);
  }

}
