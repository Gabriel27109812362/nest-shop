import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDTO {
  @ApiProperty()
  readonly idUser: number;

  @ApiProperty({ required: false })
  readonly orderDate?: string;
}
