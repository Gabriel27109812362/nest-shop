import { ApiProperty } from '@nestjs/swagger';

export class AddProductDTO {
  @ApiProperty()
  idOrder: number;

  @ApiProperty()
  idProduct: number;

  @ApiProperty()
  amount: number;

}
