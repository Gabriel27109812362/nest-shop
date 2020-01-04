import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { ProductService } from '../../services/product/product.service';
import { Response } from 'express';
import { CreateProductDTO } from '../../DTO/product/createProductDTO';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AddProducersDTO } from '../../DTO/product/addProducersDTO';

@ApiTags('product')
@Controller('product')
export class ProductController {

  constructor(private productService: ProductService) {
  }

  @Get()
  async getAllProducts(@Res() res: Response) {
    const value = await this.productService.getAllProductsQueryExec();
    res.json(value);
  }

  @ApiParam({ name: 'id', type: 'number', required: true, allowEmptyValue: false })
  @Get(':id')
  async getProductById(@Param() params, @Res() res: Response) {
    const { id } = params;
    const value = await this.productService.getProductByIdQueryExec(id);
    !value ? res.sendStatus(404) : res.json(value);
  }

  @Post()
  async addNewProduct(@Body() createProductDTO: CreateProductDTO, @Res() res: Response) {
    await this.productService.addNewProductQueryExec(createProductDTO);
    res.send('product has been created');
  }

  @Patch('addProducer')
  async addProducers(@Body() addProducersDTO: AddProducersDTO, @Res() res: Response) {
    const { idProducer, idProduct, price } = addProducersDTO;
    await this.productService.addProducerQueryExec(addProducersDTO);
    res.send(`Product ${idProduct} has been updated with producer ${idProducer} and price ${price}`);
  }

}
