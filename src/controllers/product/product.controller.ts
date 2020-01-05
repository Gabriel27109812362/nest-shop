import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { ProductService } from '../../services/product/product.service';
import { Response } from 'express';
import { CreateProductDTO } from '../../DTO/product/createProductDTO';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AddProducersDTO } from '../../DTO/product/addProducersDTO';
import { AddCategoriesDTO } from '../../DTO/product/addCategoriesDTO';
import { EditProductDTO } from '../../DTO/product/editProductDTO';
import { DeleteProducerDTO } from '../../DTO/product/deleteProducerDTO';

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
  async addProducer(@Body() addProducersDTO: AddProducersDTO, @Res() res: Response) {
    const { idProducer, idProduct, price } = addProducersDTO;
    await this.productService.addProducerQueryExec(addProducersDTO);
    res.send(`Product ${idProduct} has been updated with producer ${idProducer} and price ${price}`);
  }

  @Patch('addCategories')
  async addCategories(@Body() addCategoriesDTO: AddCategoriesDTO, @Res() res: Response) {
    const { idProduct, idCategories } = addCategoriesDTO;
    await this.productService.addCategoriesQueryExec(addCategoriesDTO);
    res.send(`Categories ${idCategories} has been added to product ${idProduct}`);
  }

  @Delete('deleteProducer')
  async deleteProducer(@Body() deleteProducerDTO: DeleteProducerDTO, @Res() res: Response) {
    const { idProduct, idProducer } = deleteProducerDTO;
    await this.productService.deleteProducerQueryExec(deleteProducerDTO);
    res.send(`product ${idProduct} producers ${idProducer} has been deleted`);
  }

  @ApiParam({ name: 'id', type: 'number', required: true, allowEmptyValue: false })
  @Delete(':id')
  async deleteProduct(@Param() params, @Res() res: Response) {
    const { id } = params;
    await this.productService.deleteProductByIdQueryExec(id);
    res.send(`Product ${id} has been removed`);
  }

  @ApiParam({ name: 'id', type: 'number', required: true, allowEmptyValue: false })
  @Patch(':id')
  async editProductById(@Param() params, @Body() editProductDTO: EditProductDTO, @Res() res: Response) {
    const { id } = params;
    await this.productService.editProductByIdQueryExec(id, editProductDTO);
    res.send(`Product ${id} has been updated`);
  }
}
