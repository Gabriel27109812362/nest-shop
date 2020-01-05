import { ApiProperty } from '@nestjs/swagger';

export class DeleteProducersDTO {
  @ApiProperty()
  readonly idProduct: number;

  @ApiProperty({ type: [Number] })
  readonly idProducers: number[];
}
