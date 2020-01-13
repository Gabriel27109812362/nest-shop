import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDTO } from '../../DTO/order/createOrderDTO';
import { getManager } from 'typeorm';
import { User } from '../../models/user';
import { Order } from '../../models/order';
import { AddProductDTO } from '../../DTO/order/addProductDTO';
import { OrderDetails } from '../../models/orderDetails';
import { Product } from '../../models/product';
import { DeleteProductDTO } from '../../DTO/order/deleteProductDTO';

@Injectable()
export class OrderService {

  private manager = getManager();
  private date: Date;

  async createOrderQueryExec(dto: CreateOrderDTO) {
    const { idUser, orderDate } = dto;

    if (!orderDate) {
      this.date = new Date(Date.now());
    } else {
      this.date = new Date(orderDate);
    }

    const user = await this.manager
      .findOne(User, idUser);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const order = new Order()
      .setUser(user)
      .setDateOrder(this.date)
      .setOrderStatus('EMPTY_ORDER');

    return await this.manager.save(order);
  }

  async addProductToOrderQueryExec(dto: AddProductDTO) {
    const { idOrder, idProduct, amount } = dto;

    const order = await this.manager
      .findOne(Order, idOrder);

    if (!order) {
      throw new NotFoundException('Order not found');
    }
    const product = await this.manager
      .findOne(Product, idProduct);

    if (!product) {
      throw new NotFoundException('Product Not found');
    }

    product.setMagazineState(product.magazineState - amount);
    order.setOrderStatus('PENDING_TO_PAY');

    await this.manager.save(product);
    await this.manager.save(order);

    const orderDetails = new OrderDetails()
      .setOrder(order)
      .setProduct(product)
      .setAmount(amount);

    return await this.manager.save(orderDetails);
  }

  async deleteProductFormOrderQueryExec(dto: DeleteProductDTO) {
    const { idOrder, idProduct } = dto;

    const foundedProduct = await this.manager
      .findOne(Product, idProduct);

    if (!foundedProduct) {
      throw new NotFoundException('Product in order details not found');
    }

    const foundedOrder = await this.manager
      .findOne(Order, idOrder);

    if (!foundedOrder) {
      throw new NotFoundException('Order in order details not found');
    }

    const orderDetails = await this.manager
      .createQueryBuilder(OrderDetails, 'orderDetails')
      .leftJoinAndSelect('orderDetails.product', 'product')
      .leftJoinAndSelect('orderDetails.order', 'order')
      .where('product.idProduct = :product AND order.idOrder = :order', { product: idProduct, order: idOrder })
      .getOne();

    if (!orderDetails) {
      throw new NotFoundException('Order details not found');
    }

    foundedProduct.setMagazineState(Number(foundedProduct.magazineState) + Number(orderDetails.amount));

    await this.manager.save(foundedProduct);
    return await this.manager
      .delete(OrderDetails, orderDetails);

  }

}
