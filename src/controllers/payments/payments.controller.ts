import { BadRequestException, Body, Controller, Get, InternalServerErrorException, NotFoundException, Param, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { PaymentsService } from '../../services/payments/payments.service';
import { CreatePaymentDTO } from '../../DTO/payment/createPaymentDTO';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {

  constructor(private paymentsService: PaymentsService) {
  }

  @Get()
  async getAllPayments() {
    const payments = await this.paymentsService.getAllPaymentsQueryExec();
    if (!payments) {
      throw new InternalServerErrorException('Something went wrong in payment service');
    }
    return payments;
  }

  @ApiParam({ name: 'id', type: 'number', required: true, allowEmptyValue: false })
  @Get(':id')
  async getPaymentById(@Param() params) {
    const { id } = params;
    const payment = await this.paymentsService.getPaymentByIdQueryExec(id);
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

  }

  @Post()
  async addNewPayment(@Body() dto: CreatePaymentDTO) {
    const { idOrder } = dto;
    const exec = await this.paymentsService.addNewPaymentQueryExec(dto);
    if (!exec) {
      throw new BadRequestException('Something went wrong in creating payment');
    }
    return `payment for order ${idOrder} has been created`;
  }

}
