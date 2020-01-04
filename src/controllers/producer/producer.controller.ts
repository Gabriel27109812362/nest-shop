import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProducerService } from '../../services/producer/producer.service';
import { CreateProducerDTO } from '../../DTO/producer/createProducerDTO';
import { EditProducerDTO } from '../../DTO/producer/editProducerDTO';

@Controller('producer')
export class ProducerController {

  constructor(private producerService: ProducerService) {
  }

  @Get()
  async getAllProducers(@Res() res: Response) {
    const value = await this.producerService.getAllProducersQueryExec();
    res.json(value);

  }

  @Get(':id')
  async getProducerById(@Param() params, @Res() res: Response) {
    const { id } = params;
    const value = await this.producerService.getProducerByIdQueryExec(id);
    res.json(value);
  }

  @Post()
  async addNewProducer(@Body() createProducerDTO: CreateProducerDTO, @Res() res: Response) {
    await this.producerService.addNewProducerQueryExec(createProducerDTO);
    res.send('Producer has been created');
  }

  @Delete(':id')
  async deleteProducerById(@Param() params, @Res() res: Response) {
    const { id } = params;
    await this.producerService.deleteProducerQueryExec(id);
    res.send(`Producer ${id} has been deleted`);
  }

  @Patch(':id')
  async editProducerById(@Param() params, @Body() editProducerDTO: EditProducerDTO, @Res() res: Response) {
    const { id } = params;
    await this.producerService.editProducerQueryExec(id, editProducerDTO);
    res.send(`Producer ${id} has been changed`);
  }

}
