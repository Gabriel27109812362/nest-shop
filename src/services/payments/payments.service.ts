import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { getManager } from 'typeorm';
import { Payment } from '../../models/payment';
import { CreatePaymentDTO } from '../../DTO/payment/createPaymentDTO';
import { Order } from '../../models/order';

@Injectable()
export class PaymentsService {

  private manager = getManager();

  getAllPaymentsQueryExec() {
    return this.manager
      .find(Payment, {});
  }

  getPaymentByIdQueryExec(id: number | string) {
    return this.manager
      .findOne(Payment, Number(id));
  }

  async addNewPaymentQueryExec(dto: CreatePaymentDTO) {
    const { idOrder, amount, description, paymentMethod } = dto;

    const founderOrder = await this.manager
      .findOne(Order, idOrder);

    if (!founderOrder) {
      throw new NotFoundException('Order not found');
    }
    if (founderOrder.orderStatus === 'EMPTY_ORDER') {
      throw new BadRequestException('Can not paid for empty order');
    }

    const payment = new Payment()
      .setAmount(amount)
      .setDescription(description)
      .setPaymentMethod(paymentMethod)
      .setPaymentDate(new Date(Date.now()))
      .setPaymentStatus('EXECUTED');

    founderOrder.setOrderStatus('PAID');
    await this.manager.save(founderOrder);

    payment.setOrder(founderOrder);
    return await this.manager.save(payment);

  }

}
