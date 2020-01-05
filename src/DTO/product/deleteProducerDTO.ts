import { ApiProperty } from '@nestjs/swagger';

export class DeleteProducerDTO {
  @ApiProperty()
  readonly idProduct: number;

  @ApiProperty()
  readonly idProducer: number;
}
