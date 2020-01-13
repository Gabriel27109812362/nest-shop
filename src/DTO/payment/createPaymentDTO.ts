import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDTO {
  @ApiProperty()
  idOrder: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  paymentMethod: 'cash' | 'card' | 'transfer';

  @ApiProperty()
  description: string;
}
