import { ApiProperty } from '@nestjs/swagger';

export class DeleteProductDTO {
  @ApiProperty()
  idProduct: number;

  @ApiProperty()
  idOrder: number;
}
