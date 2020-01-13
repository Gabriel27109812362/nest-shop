import { ApiProperty } from '@nestjs/swagger';

export class AddProducersDTO {

  @ApiProperty()
  readonly idProduct: number;

  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  readonly idProducer: number;

}
