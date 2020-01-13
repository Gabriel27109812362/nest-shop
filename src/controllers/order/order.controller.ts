import { Body, Controller, Delete, InternalServerErrorException, Post } from '@nestjs/common';
import { OrderService } from '../../services/order/order.service';
import { CreateOrderDTO } from '../../DTO/order/createOrderDTO';
import { ApiTags } from '@nestjs/swagger';
import { AddProductDTO } from '../../DTO/order/addProductDTO';
import { DeleteProductDTO } from '../../DTO/order/deleteProductDTO';

@ApiTags('order')
@Controller('order')
export class OrderController {

  constructor(private orderService: OrderService) {
  }

  @Post()
  async createOrder(@Body() dto: CreateOrderDTO) {
    const { idUser } = dto;
    const exec = await this.orderService.createOrderQueryExec(dto);

    if (!exec) {
      throw new InternalServerErrorException('Something went wrong in order service');
    }

    return `Empty order has been created for user: ${idUser}`;
  }

  @Post('addProduct')
  async addProductToOrder(@Body() dto: AddProductDTO) {
    const { idProduct, idOrder, amount } = dto;
    const exec = await this.orderService.addProductToOrderQueryExec(dto);
    if (!exec) {
      throw new InternalServerErrorException('Something went wrong in order service');
    }
    return `Product ${idProduct} has been added to order ${idOrder} with amount ${amount}`;
  }

  @Delete('deleteProduct')
  async deleteProductFromOrder(@Body() dto: DeleteProductDTO) {
    const { idProduct, idOrder } = dto;
    const exec = await this.orderService.deleteProductFormOrderQueryExec(dto);
    return `Product ${idProduct} has been deleted from order ${idOrder}`;
  }

}


