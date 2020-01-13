import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { VatService } from '../../services/vat/vat.service';
import { Response } from 'express';
import { CreateEditVatDTO } from '../../DTO/vat/createEditVatDTO';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('vat')
@Controller('vat')
export class VatController {

  constructor(private vatService: VatService) {
  }

  @Get()
  async getAllVats(@Res() res: Response) {
    const value = await this.vatService.getAllVatsQueryExec();
    res.json(value);
  }

  @ApiParam({ name: 'id', type: 'number', required: true, allowEmptyValue: false })
  @Get(':id')
  async getVatById(@Param() params, @Res() res: Response) {
    const { id } = params;
    const value = await this.vatService.getVatByIdQueryExec(id);
    !value ? res.sendStatus(404) : res.send(value);
  }

  @Post()
  async addNewVat(@Body() createVatDTO: CreateEditVatDTO, @Res() res: Response) {
    await this.vatService.createNewVatQueryExec(createVatDTO);
    res.send('Vat has been created');
  }

  @ApiParam({ name: 'id', type: 'number', required: true, allowEmptyValue: false })
  @Delete(':id')
  async deleteVatById(@Param() params, @Res() res: Response) {
    const { id } = params;
    await this.vatService.deleteVatByIdQueryExec(id);
    res.send(`Vat ${id} has been deleted`);
  }

  @ApiParam({ name: 'id', type: 'number', required: true, allowEmptyValue: false })
  @Patch(':id')
  async editVatById(@Param() params, @Body() editVatDTO: CreateEditVatDTO, @Res() res: Response) {
    const { id } = params;
    await this.vatService.editVatByUserIdQueryExec(id, editVatDTO);
    res.json(`Vat ${id} has been changed`);
  }

}
